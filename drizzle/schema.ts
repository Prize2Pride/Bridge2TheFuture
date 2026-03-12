import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, json } from "drizzle-orm/mysql-core";

/**
 * Bridge2TheFuture Platform - Comprehensive Database Schema
 * Supports German language education (A1-C1), electrical training, gamification, VR simulations,
 * job scraping, GDPR compliance, and community features
 */

// ============== CORE USERS & AUTHENTICATION ==============
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).unique(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: text("name"),
  phone: varchar("phone", { length: 20 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "mentor", "admin", "founder"]).default("user").notNull(),
  isFounder: int("isFounder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
  // GDPR fields
  gdprConsentGiven: int("gdprConsentGiven").default(0),
  gdprConsentDate: timestamp("gdprConsentDate"),
  dataProcessingConsent: int("dataProcessingConsent").default(0),
  marketingConsent: int("marketingConsent").default(0),
  isDataExportRequested: int("isDataExportRequested").default(0),
  isAccountDeletionRequested: int("isAccountDeletionRequested").default(0),
  accountDeletionScheduledAt: timestamp("accountDeletionScheduledAt"),
  dataRetentionDays: int("dataRetentionDays").default(365),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ============== USER PROFILES & SKILLS ==============
export const userProfiles = mysqlTable("user_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  bio: text("bio"),
  avatarUrl: varchar("avatarUrl", { length: 512 }),
  location: varchar("location", { length: 255 }),
  preferredLanguage: varchar("preferredLanguage", { length: 10 }).default("en"),
  learningStyle: mysqlEnum("learningStyle", ["visual", "auditory", "kinesthetic", "reading"]).default("visual"),
  currentGermanLevel: mysqlEnum("currentGermanLevel", ["A1", "A2", "B1", "B2", "C1", "C2"]),
  targetGermanLevel: mysqlEnum("targetGermanLevel", ["A1", "A2", "B1", "B2", "C1", "C2"]),
  electricalSkillLevel: mysqlEnum("electricalSkillLevel", ["beginner", "intermediate", "advanced"]),
  totalLearningHours: int("totalLearningHours").default(0),
  totalPointsEarned: int("totalPointsEarned").default(0),
  currentStreak: int("currentStreak").default(0),
  longestStreak: int("longestStreak").default(0),
  lastActivityDate: timestamp("lastActivityDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = typeof userProfiles.$inferInsert;

export const userSkills = mysqlTable("user_skills", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  skillName: varchar("skillName", { length: 255 }).notNull(),
  proficiencyLevel: mysqlEnum("proficiencyLevel", ["beginner", "intermediate", "advanced", "expert"]).default("beginner"),
  yearsOfExperience: int("yearsOfExperience").default(0),
  endorsementCount: int("endorsementCount").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserSkill = typeof userSkills.$inferSelect;
export type InsertUserSkill = typeof userSkills.$inferInsert;

// ============== COURSES & LEARNING MODULES ==============
export const courses = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: mysqlEnum("category", ["german_language", "electrical_training", "smart_home", "professional_development"]).notNull(),
  level: mysqlEnum("level", ["A1", "A2", "B1", "B2", "C1", "C2", "beginner", "intermediate", "advanced"]).notNull(),
  instructorId: int("instructorId").references(() => users.id, { onDelete: "set null" }),
  coverImageUrl: varchar("coverImageUrl", { length: 512 }),
  estimatedHours: int("estimatedHours"),
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).default("medium"),
  isPublished: int("isPublished").default(0),
  enrollmentCount: int("enrollmentCount").default(0),
  averageRating: decimal("averageRating", { precision: 3, scale: 2 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

export const courseModules = mysqlTable("course_modules", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").notNull().references(() => courses.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  sequenceOrder: int("sequenceOrder").notNull(),
  estimatedMinutes: int("estimatedMinutes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CourseModule = typeof courseModules.$inferSelect;
export type InsertCourseModule = typeof courseModules.$inferInsert;

export const lessons = mysqlTable("lessons", {
  id: int("id").autoincrement().primaryKey(),
  moduleId: int("moduleId").notNull().references(() => courseModules.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  videoUrl: varchar("videoUrl", { length: 512 }),
  audioUrl: varchar("audioUrl", { length: 512 }),
  sequenceOrder: int("sequenceOrder").notNull(),
  estimatedMinutes: int("estimatedMinutes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = typeof lessons.$inferInsert;

// ============== GAMIFICATION ==============
export const achievements = mysqlTable("achievements", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: mysqlEnum("category", ["language", "technical", "community", "streak", "milestone"]).notNull(),
  points: int("points").default(0),
  badgeImageUrl: varchar("badgeImageUrl", { length: 512 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = typeof achievements.$inferInsert;

export const userAchievements = mysqlTable("user_achievements", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  achievementId: int("achievementId").notNull().references(() => achievements.id, { onDelete: "cascade" }),
  unlockedAt: timestamp("unlockedAt").defaultNow().notNull(),
});

export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = typeof userAchievements.$inferInsert;

export const leaderboards = mysqlTable("leaderboards", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  totalPoints: int("totalPoints").default(0),
  languageLearningPoints: int("languageLearningPoints").default(0),
  technicalTrainingPoints: int("technicalTrainingPoints").default(0),
  communityContributionPoints: int("communityContributionPoints").default(0),
  rank: int("rank"),
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow(),
});

export type Leaderboard = typeof leaderboards.$inferSelect;
export type InsertLeaderboard = typeof leaderboards.$inferInsert;

// ============== VR SIMULATIONS ==============
export const vrSimulations = mysqlTable("vr_simulations", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").references(() => courses.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  simulationType: mysqlEnum("simulationType", ["german_conversation", "electrical_circuit", "smart_home_installation"]).notNull(),
  difficultyLevel: mysqlEnum("difficultyLevel", ["beginner", "intermediate", "advanced"]).default("beginner"),
  estimatedMinutes: int("estimatedMinutes"),
  scenarioData: text("scenarioData"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type VrSimulation = typeof vrSimulations.$inferSelect;
export type InsertVrSimulation = typeof vrSimulations.$inferInsert;

export const userVrProgress = mysqlTable("user_vr_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  simulationId: int("simulationId").notNull().references(() => vrSimulations.id, { onDelete: "cascade" }),
  completionPercentage: int("completionPercentage").default(0),
  score: int("score"),
  feedback: text("feedback"),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserVrProgress = typeof userVrProgress.$inferSelect;
export type InsertUserVrProgress = typeof userVrProgress.$inferInsert;

// ============== OPPORTUNITIES & JOB MATCHING ==============
export const opportunities = mysqlTable("opportunities", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  opportunityType: mysqlEnum("opportunityType", ["job", "internship", "scholarship", "course", "mentorship"]).notNull(),
  company: varchar("company", { length: 255 }),
  location: varchar("location", { length: 255 }),
  country: varchar("country", { length: 100 }).default("Germany"),
  salary: varchar("salary", { length: 255 }),
  requiredSkills: text("requiredSkills"),
  sourceUrl: varchar("sourceUrl", { length: 512 }),
  deadline: timestamp("deadline"),
  isActive: int("isActive").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Opportunity = typeof opportunities.$inferSelect;
export type InsertOpportunity = typeof opportunities.$inferInsert;

export const opportunityMatches = mysqlTable("opportunity_matches", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  opportunityId: int("opportunityId").notNull().references(() => opportunities.id, { onDelete: "cascade" }),
  matchScore: int("matchScore"),
  isSaved: int("isSaved").default(0),
  isApplied: int("isApplied").default(0),
  appliedAt: timestamp("appliedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type OpportunityMatch = typeof opportunityMatches.$inferSelect;
export type InsertOpportunityMatch = typeof opportunityMatches.$inferInsert;

// ============== GDPR COMPLIANCE ==============
export const gdprConsentLog = mysqlTable("gdpr_consent_log", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  consentType: mysqlEnum("consentType", ["general", "data_processing", "marketing", "analytics"]).notNull(),
  consentGiven: int("consentGiven").notNull(),
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: varchar("userAgent", { length: 512 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GdprConsentLog = typeof gdprConsentLog.$inferSelect;
export type InsertGdprConsentLog = typeof gdprConsentLog.$inferInsert;

export const dataAccessLog = mysqlTable("data_access_log", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  dataType: varchar("dataType", { length: 255 }).notNull(),
  action: mysqlEnum("action", ["read", "create", "update", "delete", "export"]).notNull(),
  ipAddress: varchar("ipAddress", { length: 45 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DataAccessLog = typeof dataAccessLog.$inferSelect;
export type InsertDataAccessLog = typeof dataAccessLog.$inferInsert;

// ============== COMMUNITY FEATURES ==============
export const mentorships = mysqlTable("mentorships", {
  id: int("id").autoincrement().primaryKey(),
  mentorId: int("mentorId").notNull().references(() => users.id, { onDelete: "cascade" }),
  menteeId: int("menteeId").notNull().references(() => users.id, { onDelete: "cascade" }),
  focusArea: varchar("focusArea", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["active", "completed", "paused"]).default("active"),
  startDate: timestamp("startDate").defaultNow(),
  endDate: timestamp("endDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Mentorship = typeof mentorships.$inferSelect;
export type InsertMentorship = typeof mentorships.$inferInsert;

export const discussionForums = mysqlTable("discussion_forums", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").references(() => courses.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  createdBy: int("createdBy").notNull().references(() => users.id, { onDelete: "cascade" }),
  replyCount: int("replyCount").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DiscussionForum = typeof discussionForums.$inferSelect;
export type InsertDiscussionForum = typeof discussionForums.$inferInsert;

export const forumReplies = mysqlTable("forum_replies", {
  id: int("id").autoincrement().primaryKey(),
  forumId: int("forumId").notNull().references(() => discussionForums.id, { onDelete: "cascade" }),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  upvotes: int("upvotes").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ForumReply = typeof forumReplies.$inferSelect;
export type InsertForumReply = typeof forumReplies.$inferInsert;

export const learningGroups = mysqlTable("learning_groups", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  skillLevel: mysqlEnum("skillLevel", ["A1", "A2", "B1", "B2", "C1", "C2", "beginner", "intermediate", "advanced"]).notNull(),
  topic: varchar("topic", { length: 255 }).notNull(),
  createdBy: int("createdBy").notNull().references(() => users.id, { onDelete: "cascade" }),
  memberCount: int("memberCount").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type LearningGroup = typeof learningGroups.$inferSelect;
export type InsertLearningGroup = typeof learningGroups.$inferInsert;

export const groupMembers = mysqlTable("group_members", {
  id: int("id").autoincrement().primaryKey(),
  groupId: int("groupId").notNull().references(() => learningGroups.id, { onDelete: "cascade" }),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  joinedAt: timestamp("joinedAt").defaultNow(),
});

export type GroupMember = typeof groupMembers.$inferSelect;
export type InsertGroupMember = typeof groupMembers.$inferInsert;

// ============== LEARNING ANALYTICS ==============
export const learningAnalytics = mysqlTable("learning_analytics", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  totalLessonsCompleted: int("totalLessonsCompleted").default(0),
  totalHoursSpent: int("totalHoursSpent").default(0),
  averageQuizScore: int("averageQuizScore"),
  learningVelocity: mysqlEnum("learningVelocity", ["slow", "moderate", "fast"]).default("moderate"),
  preferredLearningTime: varchar("preferredLearningTime", { length: 50 }),
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow(),
});

export type LearningAnalytics = typeof learningAnalytics.$inferSelect;
export type InsertLearningAnalytics = typeof learningAnalytics.$inferInsert;

export const aiGeneratedCourses = mysqlTable("ai_generated_courses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  targetSkills: text("targetSkills"),
  learningPath: text("learningPath"),
  estimatedHours: int("estimatedHours"),
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).default("medium"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AiGeneratedCourse = typeof aiGeneratedCourses.$inferSelect;
export type InsertAiGeneratedCourse = typeof aiGeneratedCourses.$inferInsert;

// ============== COURSE ENROLLMENT ==============
export const courseEnrollments = mysqlTable("course_enrollments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  courseId: int("courseId").notNull().references(() => courses.id, { onDelete: "cascade" }),
  progressPercentage: int("progressPercentage").default(0),
  completedAt: timestamp("completedAt"),
  enrolledAt: timestamp("enrolledAt").defaultNow(),
});

export type CourseEnrollment = typeof courseEnrollments.$inferSelect;
export type InsertCourseEnrollment = typeof courseEnrollments.$inferInsert;

// ============== QUIZ & ASSESSMENTS ==============
export const quizzes = mysqlTable("quizzes", {
  id: int("id").autoincrement().primaryKey(),
  lessonId: int("lessonId").notNull().references(() => lessons.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  passingScore: int("passingScore").default(70),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = typeof quizzes.$inferInsert;

export const quizQuestions = mysqlTable("quiz_questions", {
  id: int("id").autoincrement().primaryKey(),
  quizId: int("quizId").notNull().references(() => quizzes.id, { onDelete: "cascade" }),
  questionText: text("questionText").notNull(),
  questionType: mysqlEnum("questionType", ["multiple_choice", "true_false", "short_answer"]).notNull(),
  options: text("options"),
  correctAnswer: text("correctAnswer"),
  sequenceOrder: int("sequenceOrder"),
});

export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertQuizQuestion = typeof quizQuestions.$inferInsert;

export const userQuizAttempts = mysqlTable("user_quiz_attempts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  quizId: int("quizId").notNull().references(() => quizzes.id, { onDelete: "cascade" }),
  score: int("score"),
  passed: int("passed"),
  attemptedAt: timestamp("attemptedAt").defaultNow(),
});

export type UserQuizAttempt = typeof userQuizAttempts.$inferSelect;
export type InsertUserQuizAttempt = typeof userQuizAttempts.$inferInsert;

// ============== AI INSTRUCTOR SYSTEM ==============
export const aiInstructor = mysqlTable("ai_instructor", {
  id: int("id").autoincrement().primaryKey(),
  founderId: int("founderId").notNull().references(() => users.id, { onDelete: "cascade" }),
  avatarUrl: varchar("avatarUrl", { length: 512 }).notNull(),
  germanTutorAvatarUrl: varchar("germanTutorAvatarUrl", { length: 512 }),
  electricalExpertAvatarUrl: varchar("electricalExpertAvatarUrl", { length: 512 }),
  nursingInstructorAvatarUrl: varchar("nursingInstructorAvatarUrl", { length: 512 }),
  futuristicAiEngineerAvatarUrl: varchar("futuristicAiEngineerAvatarUrl", { length: 512 }),
  name: varchar("name", { length: 255 }).notNull(),
  bio: text("bio"),
  specializations: text("specializations"),
  llmProvider: mysqlEnum("llmProvider", ["claude", "gpt", "hybrid"]).default("hybrid"),
  isActive: int("isActive").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AiInstructor = typeof aiInstructor.$inferSelect;
export type InsertAiInstructor = typeof aiInstructor.$inferInsert;

export const instructorLessons = mysqlTable("instructor_lessons", {
  id: int("id").autoincrement().primaryKey(),
  instructorId: int("instructorId").notNull().references(() => aiInstructor.id, { onDelete: "cascade" }),
  lessonId: int("lessonId").notNull().references(() => lessons.id, { onDelete: "cascade" }),
  generatedContent: text("generatedContent"),
  adaptationLevel: mysqlEnum("adaptationLevel", ["casual", "standard", "formal", "diplomatic"]).default("standard"),
  germanLevel: mysqlEnum("germanLevel", ["A1", "A2", "B1", "B2", "C1", "C2"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type InstructorLesson = typeof instructorLessons.$inferSelect;
export type InsertInstructorLesson = typeof instructorLessons.$inferInsert;

// ============== FOUNDER MANAGEMENT ==============
export const founderProfiles = mysqlTable("founder_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  companyName: varchar("companyName", { length: 255 }),
  companyDescription: text("companyDescription"),
  website: varchar("website", { length: 512 }),
  phone1: varchar("phone1", { length: 20 }),
  phone2: varchar("phone2", { length: 20 }),
  phone3: varchar("phone3", { length: 20 }),
  email1: varchar("email1", { length: 320 }),
  email2: varchar("email2", { length: 320 }),
  profileImageUrl: varchar("profileImageUrl", { length: 512 }),
  bio: text("bio"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FounderProfile = typeof founderProfiles.$inferSelect;
export type InsertFounderProfile = typeof founderProfiles.$inferInsert;
