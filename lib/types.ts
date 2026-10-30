export type ReviewStatus = "pending" | "approved" | "rejected";

export type ReviewType = "review" | "comment";

export interface ReviewItem {
  id: string;
  type: ReviewType;
  name: string;
  role?: string; // Status (e.g., Grade 11 Student, Math Educator)
  mathBackground?: string; // Math Background (e.g., RMO Awardee, INMO Awardee)
  hasBought: boolean;
  rating?: number; // 1 to 5 (only relevant for reviews)
  content: string;
  status: ReviewStatus;
  createdAt: string;
}

export interface ReviewSubmissionPayload {
  type: ReviewType;
  name: string;
  role?: string;
  mathBackground?: string;
  hasBought: boolean;
  rating?: number;
  content: string;
  readerCode?: string;
}

export interface ReviewsStats {
  averageRating: number;
  totalRatings: number;
  totalReviews: number;
  totalComments: number;
}
