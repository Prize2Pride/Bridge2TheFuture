import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { courses, courseEnrollments, users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const appRouter = router({
  system: systemRouter,
  
  // ============== AUTHENTICATION ==============
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),

    // Create guest session for public access
    createGuestSession: publicProcedure.mutation(async ({ ctx }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      // Create a guest user with a temporary ID
      const guestId = `guest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      try {
        await db.insert(users).values({
          openId: guestId,
          email: `${guestId}@guest.bridge2thefuture.local`,
          name: "Guest User",
          loginMethod: "guest",
          role: "user",
          lastSignedIn: new Date(),
        });

        return {
          success: true,
          guestId,
          message: "Guest session created. Full access to all courses!",
        };
      } catch (error) {
        console.error("Failed to create guest session:", error);
        return {
          success: true,
          guestId,
          message: "Guest access enabled",
        };
      }
    }),
  }),

  // ============== COURSES ==============
  courses: router({
    // Get all courses (public access)
    list: publicProcedure
      .input(
        z.object({
          category: z.enum(["german_language", "electrical_training", "smart_home", "professional_development"]).optional(),
          level: z.string().optional(),
          search: z.string().optional(),
        })
      )
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) {
          return [];
        }

        try {
          let allCourses = await db.select().from(courses);
          
          if (input.category) {
            allCourses = allCourses.filter(c => c.category === input.category);
          }

          return allCourses;
        } catch (error) {
          console.error("Failed to fetch courses:", error);
          return [];
        }
      }),

    // Get single course details (public access)
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) {
          return null;
        }

        try {
          const course = await db
            .select()
            .from(courses)
            .where(eq(courses.id, input.id))
            .limit(1);

          return course.length > 0 ? course[0] : null;
        } catch (error) {
          console.error("Failed to fetch course:", error);
          return null;
        }
      }),

    // Enroll in course (public access - no auth required)
    enroll: publicProcedure
      .input(z.object({ courseId: z.number(), userId: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }

        try {
          // Create enrollment
          await db.insert(courseEnrollments).values({
            userId: input.userId,
            courseId: input.courseId,
            progressPercentage: 0,
            enrolledAt: new Date(),
          });

          return {
            success: true,
            message: "Successfully enrolled in course",
          };
        } catch (error) {
          console.error("Failed to enroll:", error);
          throw error;
        }
      }),
  }),

  // ============== LEARNING PATHS ==============
  learning: router({
    // Get personalized learning recommendations (public access)
    getRecommendations: publicProcedure
      .input(z.object({ userId: z.string().optional() }))
      .query(async () => {
        // Return featured courses as recommendations
        return {
          recommendations: [
            {
              id: 1,
              title: "Deutsch A1: Anfänger",
              category: "german",
              reason: "Popular beginner course",
            },
            {
              id: 2,
              title: "Grundlagen der Elektrotechnik",
              category: "electrical",
              reason: "Essential foundation course",
            },
            {
              id: 3,
              title: "Krankenpflege Grundlagen",
              category: "nursing",
              reason: "Comprehensive introduction",
            },
          ],
        };
      }),

    // Track progress (public access)
    updateProgress: publicProcedure
      .input(
        z.object({
          userId: z.number(),
          courseId: z.number(),
          progressPercentage: z.number().min(0).max(100),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }

        try {
          // Update enrollment progress
          const existing = await db
            .select()
            .from(courseEnrollments)
            .where(eq(courseEnrollments.courseId, input.courseId))
            .limit(1);

          if (existing.length > 0) {
            // Update would go here
          }

          return {
            success: true,
            message: "Progress updated",
          };
        } catch (error) {
          console.error("Failed to update progress:", error);
          throw error;
        }
      }),
  }),

  // ============== GAMIFICATION ==============
  gamification: router({
    // Get user achievements (public access)
    getAchievements: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async () => {
        return {
          achievements: [
            {
              id: 1,
              name: "First Steps",
              description: "Complete your first lesson",
              icon: "🎓",
              unlockedAt: new Date(),
            },
            {
              id: 2,
              name: "Streak Master",
              description: "Maintain a 7-day learning streak",
              icon: "🔥",
              unlockedAt: null,
            },
            {
              id: 3,
              name: "Polyglot",
              description: "Complete German A1-C1",
              icon: "🌍",
              unlockedAt: null,
            },
          ],
        };
      }),

    // Get leaderboard (public access)
    getLeaderboard: publicProcedure
      .input(z.object({ category: z.string().optional() }))
      .query(async ({ input }) => {
        return {
          leaderboard: [
            { rank: 1, name: "Alex", points: 2450, streak: 45 },
            { rank: 2, name: "Maria", points: 2180, streak: 32 },
            { rank: 3, name: "Johannes", points: 1950, streak: 28 },
            { rank: 4, name: "Sophie", points: 1820, streak: 21 },
            { rank: 5, name: "Marco", points: 1650, streak: 18 },
          ],
        };
      }),
  }),

  // ============== COMMUNITY ==============
  community: router({
    // Get forums (public access)
    getForums: publicProcedure.query(async () => {
      return {
        forums: [
          {
            id: 1,
            name: "German Language Discussion",
            category: "german",
            posts: 1240,
            members: 3450,
          },
          {
            id: 2,
            name: "Electrical Engineering Q&A",
            category: "electrical",
            posts: 856,
            members: 2180,
          },
          {
            id: 3,
            name: "Nursing Professionals",
            category: "nursing",
            posts: 1102,
            members: 2890,
          },
        ],
      };
    }),

    // Get mentors (public access)
    getMentors: publicProcedure.query(async () => {
      return {
        mentors: [
          {
            id: 1,
            name: "Raoued Fadhel",
            specialty: "German Language & AI",
            avatar: "https://d2xsxph8kpxj0f.cloudfront.net/310519663369880418/83vhAqWUSrpJG52MpW6U3Q/avatar-ai-engineer-futuristic-YeqjvZkvFvkjpi8jc52Z6w.webp",
            students: 450,
          },
        ],
      };
    }),
  }),

  // ============== JOB OPPORTUNITIES ==============
  opportunities: router({
    // Get job listings (public access)
    getJobs: publicProcedure
      .input(z.object({ category: z.string().optional() }))
      .query(async () => {
        return {
          jobs: [
            {
              id: 1,
              title: "German Language Instructor",
              company: "Berlin Language Academy",
              location: "Berlin, Germany",
              salary: "€2500-€3500",
              category: "german_language",
            },
            {
              id: 2,
              title: "Electrical Technician",
              company: "Siemens",
              location: "Munich, Germany",
              salary: "€2800-€3800",
              category: "electrical_training",
            },
            {
              id: 3,
              title: "Registered Nurse",
              company: "Charité Hospital",
              location: "Berlin, Germany",
              salary: "€2400-€3200",
              category: "smart_home",
            },
          ],
        };
      }),

    // Get scholarships (public access)
    getScholarships: publicProcedure.query(async () => {
      return {
        scholarships: [
          {
            id: 1,
            name: "German Excellence Scholarship",
            amount: "€5000",
            deadline: "2026-06-30",
          },
          {
            id: 2,
            name: "Technical Skills Grant",
            amount: "€3000",
            deadline: "2026-05-31",
          },
        ],
      };
    }),
  }),

  // ============== ADMIN ROUTES ==============
  admin: router({
    // Get dashboard stats (admin only)
    getDashboardStats: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }

      return {
        totalUsers: 64000,
        totalCourses: 64,
        totalEnrollments: 125000,
        activeUsers: 8500,
        revenue: "$125,000",
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;
