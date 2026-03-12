CREATE TABLE `achievements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(100) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`category` enum('language','technical','community','streak','milestone') NOT NULL,
	`points` int DEFAULT 0,
	`badgeImageUrl` varchar(512),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `achievements_id` PRIMARY KEY(`id`),
	CONSTRAINT `achievements_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `ai_generated_courses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`targetSkills` text,
	`learningPath` text,
	`estimatedHours` int,
	`difficulty` enum('easy','medium','hard') DEFAULT 'medium',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ai_generated_courses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ai_instructor` (
	`id` int AUTO_INCREMENT NOT NULL,
	`founderId` int NOT NULL,
	`avatarUrl` varchar(512) NOT NULL,
	`name` varchar(255) NOT NULL,
	`bio` text,
	`specializations` text,
	`llmProvider` enum('claude','gpt','hybrid') DEFAULT 'hybrid',
	`isActive` int DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ai_instructor_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `course_enrollments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`courseId` int NOT NULL,
	`progressPercentage` int DEFAULT 0,
	`completedAt` timestamp,
	`enrolledAt` timestamp DEFAULT (now()),
	CONSTRAINT `course_enrollments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `course_modules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`sequenceOrder` int NOT NULL,
	`estimatedMinutes` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `course_modules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`category` enum('german_language','electrical_training','smart_home','professional_development') NOT NULL,
	`level` enum('A1','A2','B1','B2','C1','C2','beginner','intermediate','advanced') NOT NULL,
	`instructorId` int,
	`coverImageUrl` varchar(512),
	`estimatedHours` int,
	`difficulty` enum('easy','medium','hard') DEFAULT 'medium',
	`isPublished` int DEFAULT 0,
	`enrollmentCount` int DEFAULT 0,
	`averageRating` decimal(3,2),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `data_access_log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`dataType` varchar(255) NOT NULL,
	`action` enum('read','create','update','delete','export') NOT NULL,
	`ipAddress` varchar(45),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `data_access_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `discussion_forums` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseId` int,
	`title` varchar(255) NOT NULL,
	`description` text,
	`createdBy` int NOT NULL,
	`replyCount` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `discussion_forums_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `forum_replies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`forumId` int NOT NULL,
	`userId` int NOT NULL,
	`content` text NOT NULL,
	`upvotes` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `forum_replies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `founder_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`companyName` varchar(255),
	`companyDescription` text,
	`website` varchar(512),
	`phone1` varchar(20),
	`phone2` varchar(20),
	`phone3` varchar(20),
	`email1` varchar(320),
	`email2` varchar(320),
	`profileImageUrl` varchar(512),
	`bio` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `founder_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `founder_profiles_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `gdpr_consent_log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`consentType` enum('general','data_processing','marketing','analytics') NOT NULL,
	`consentGiven` int NOT NULL,
	`ipAddress` varchar(45),
	`userAgent` varchar(512),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `gdpr_consent_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `group_members` (
	`id` int AUTO_INCREMENT NOT NULL,
	`groupId` int NOT NULL,
	`userId` int NOT NULL,
	`joinedAt` timestamp DEFAULT (now()),
	CONSTRAINT `group_members_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `instructor_lessons` (
	`id` int AUTO_INCREMENT NOT NULL,
	`instructorId` int NOT NULL,
	`lessonId` int NOT NULL,
	`generatedContent` text,
	`adaptationLevel` enum('casual','standard','formal','diplomatic') DEFAULT 'standard',
	`germanLevel` enum('A1','A2','B1','B2','C1','C2') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `instructor_lessons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leaderboards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`totalPoints` int DEFAULT 0,
	`languageLearningPoints` int DEFAULT 0,
	`technicalTrainingPoints` int DEFAULT 0,
	`communityContributionPoints` int DEFAULT 0,
	`rank` int,
	`lastUpdated` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leaderboards_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `learning_analytics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`totalLessonsCompleted` int DEFAULT 0,
	`totalHoursSpent` int DEFAULT 0,
	`averageQuizScore` int,
	`learningVelocity` enum('slow','moderate','fast') DEFAULT 'moderate',
	`preferredLearningTime` varchar(50),
	`lastUpdated` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `learning_analytics_id` PRIMARY KEY(`id`),
	CONSTRAINT `learning_analytics_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `learning_groups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`skillLevel` enum('A1','A2','B1','B2','C1','C2','beginner','intermediate','advanced') NOT NULL,
	`topic` varchar(255) NOT NULL,
	`createdBy` int NOT NULL,
	`memberCount` int DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `learning_groups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` int AUTO_INCREMENT NOT NULL,
	`moduleId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text,
	`videoUrl` varchar(512),
	`audioUrl` varchar(512),
	`sequenceOrder` int NOT NULL,
	`estimatedMinutes` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lessons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mentorships` (
	`id` int AUTO_INCREMENT NOT NULL,
	`mentorId` int NOT NULL,
	`menteeId` int NOT NULL,
	`focusArea` varchar(255) NOT NULL,
	`status` enum('active','completed','paused') DEFAULT 'active',
	`startDate` timestamp DEFAULT (now()),
	`endDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `mentorships_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `opportunities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`opportunityType` enum('job','internship','scholarship','course','mentorship') NOT NULL,
	`company` varchar(255),
	`location` varchar(255),
	`country` varchar(100) DEFAULT 'Germany',
	`salary` varchar(255),
	`requiredSkills` text,
	`sourceUrl` varchar(512),
	`deadline` timestamp,
	`isActive` int DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `opportunities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `opportunity_matches` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`opportunityId` int NOT NULL,
	`matchScore` int,
	`isSaved` int DEFAULT 0,
	`isApplied` int DEFAULT 0,
	`appliedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `opportunity_matches_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quiz_questions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`quizId` int NOT NULL,
	`questionText` text NOT NULL,
	`questionType` enum('multiple_choice','true_false','short_answer') NOT NULL,
	`options` text,
	`correctAnswer` text,
	`sequenceOrder` int,
	CONSTRAINT `quiz_questions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quizzes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lessonId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`passingScore` int DEFAULT 70,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `quizzes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_achievements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`achievementId` int NOT NULL,
	`unlockedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_achievements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`bio` text,
	`avatarUrl` varchar(512),
	`location` varchar(255),
	`preferredLanguage` varchar(10) DEFAULT 'en',
	`learningStyle` enum('visual','auditory','kinesthetic','reading') DEFAULT 'visual',
	`currentGermanLevel` enum('A1','A2','B1','B2','C1','C2'),
	`targetGermanLevel` enum('A1','A2','B1','B2','C1','C2'),
	`electricalSkillLevel` enum('beginner','intermediate','advanced'),
	`totalLearningHours` int DEFAULT 0,
	`totalPointsEarned` int DEFAULT 0,
	`currentStreak` int DEFAULT 0,
	`longestStreak` int DEFAULT 0,
	`lastActivityDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_profiles_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `user_quiz_attempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`quizId` int NOT NULL,
	`score` int,
	`passed` int,
	`attemptedAt` timestamp DEFAULT (now()),
	CONSTRAINT `user_quiz_attempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_skills` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`skillName` varchar(255) NOT NULL,
	`proficiencyLevel` enum('beginner','intermediate','advanced','expert') DEFAULT 'beginner',
	`yearsOfExperience` int DEFAULT 0,
	`endorsementCount` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_skills_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_vr_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`simulationId` int NOT NULL,
	`completionPercentage` int DEFAULT 0,
	`score` int,
	`feedback` text,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_vr_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vr_simulations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseId` int,
	`title` varchar(255) NOT NULL,
	`description` text,
	`simulationType` enum('german_conversation','electrical_circuit','smart_home_installation') NOT NULL,
	`difficultyLevel` enum('beginner','intermediate','advanced') DEFAULT 'beginner',
	`estimatedMinutes` int,
	`scenarioData` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `vr_simulations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `openId` varchar(64);--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(320) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','mentor','admin','founder') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `isFounder` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `users` ADD `gdprConsentGiven` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `users` ADD `gdprConsentDate` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `dataProcessingConsent` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `users` ADD `marketingConsent` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `users` ADD `isDataExportRequested` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `users` ADD `isAccountDeletionRequested` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `users` ADD `accountDeletionScheduledAt` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `dataRetentionDays` int DEFAULT 365;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_email_unique` UNIQUE(`email`);--> statement-breakpoint
ALTER TABLE `ai_generated_courses` ADD CONSTRAINT `ai_generated_courses_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ai_instructor` ADD CONSTRAINT `ai_instructor_founderId_users_id_fk` FOREIGN KEY (`founderId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `course_enrollments` ADD CONSTRAINT `course_enrollments_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `course_enrollments` ADD CONSTRAINT `course_enrollments_courseId_courses_id_fk` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `course_modules` ADD CONSTRAINT `course_modules_courseId_courses_id_fk` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `courses` ADD CONSTRAINT `courses_instructorId_users_id_fk` FOREIGN KEY (`instructorId`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `data_access_log` ADD CONSTRAINT `data_access_log_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `discussion_forums` ADD CONSTRAINT `discussion_forums_courseId_courses_id_fk` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `discussion_forums` ADD CONSTRAINT `discussion_forums_createdBy_users_id_fk` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forum_replies` ADD CONSTRAINT `forum_replies_forumId_discussion_forums_id_fk` FOREIGN KEY (`forumId`) REFERENCES `discussion_forums`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forum_replies` ADD CONSTRAINT `forum_replies_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `founder_profiles` ADD CONSTRAINT `founder_profiles_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `gdpr_consent_log` ADD CONSTRAINT `gdpr_consent_log_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `group_members` ADD CONSTRAINT `group_members_groupId_learning_groups_id_fk` FOREIGN KEY (`groupId`) REFERENCES `learning_groups`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `group_members` ADD CONSTRAINT `group_members_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `instructor_lessons` ADD CONSTRAINT `instructor_lessons_instructorId_ai_instructor_id_fk` FOREIGN KEY (`instructorId`) REFERENCES `ai_instructor`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `instructor_lessons` ADD CONSTRAINT `instructor_lessons_lessonId_lessons_id_fk` FOREIGN KEY (`lessonId`) REFERENCES `lessons`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `leaderboards` ADD CONSTRAINT `leaderboards_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `learning_analytics` ADD CONSTRAINT `learning_analytics_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `learning_groups` ADD CONSTRAINT `learning_groups_createdBy_users_id_fk` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lessons` ADD CONSTRAINT `lessons_moduleId_course_modules_id_fk` FOREIGN KEY (`moduleId`) REFERENCES `course_modules`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mentorships` ADD CONSTRAINT `mentorships_mentorId_users_id_fk` FOREIGN KEY (`mentorId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mentorships` ADD CONSTRAINT `mentorships_menteeId_users_id_fk` FOREIGN KEY (`menteeId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `opportunity_matches` ADD CONSTRAINT `opportunity_matches_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `opportunity_matches` ADD CONSTRAINT `opportunity_matches_opportunityId_opportunities_id_fk` FOREIGN KEY (`opportunityId`) REFERENCES `opportunities`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quiz_questions` ADD CONSTRAINT `quiz_questions_quizId_quizzes_id_fk` FOREIGN KEY (`quizId`) REFERENCES `quizzes`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quizzes` ADD CONSTRAINT `quizzes_lessonId_lessons_id_fk` FOREIGN KEY (`lessonId`) REFERENCES `lessons`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_achievements` ADD CONSTRAINT `user_achievements_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_achievements` ADD CONSTRAINT `user_achievements_achievementId_achievements_id_fk` FOREIGN KEY (`achievementId`) REFERENCES `achievements`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_profiles` ADD CONSTRAINT `user_profiles_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_quiz_attempts` ADD CONSTRAINT `user_quiz_attempts_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_quiz_attempts` ADD CONSTRAINT `user_quiz_attempts_quizId_quizzes_id_fk` FOREIGN KEY (`quizId`) REFERENCES `quizzes`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_skills` ADD CONSTRAINT `user_skills_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_vr_progress` ADD CONSTRAINT `user_vr_progress_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_vr_progress` ADD CONSTRAINT `user_vr_progress_simulationId_vr_simulations_id_fk` FOREIGN KEY (`simulationId`) REFERENCES `vr_simulations`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vr_simulations` ADD CONSTRAINT `vr_simulations_courseId_courses_id_fk` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE no action;