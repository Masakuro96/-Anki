// src/types.ts

/**
 * Represents a deck of flashcards or a problem set.
 */
export interface Deck {
  /** Unique identifier for the deck. */
  id: string;
  /** Identifier of the user who owns this deck. */
  userId: string;
  /** Name of the deck. */
  name: string;
}

/**
 * Represents a single flashcard and its learning state.
 * This is typically used for spaced repetition systems.
 */
export interface Card {
  /** Unique identifier for the card this state pertains to. */
  id: string;
  /** Identifier of the user this card state belongs to. */
  userId: string;
  /** Identifier of the deck this card belongs to. */
  deckId: string;
  /** The date when this card is next scheduled for review. */
  nextReviewDate: Date;
  /** The current review interval for this card (e.g., in days). */
  interval: number;
  /**
   * The ease factor for this card, influencing how the interval changes.
   * A higher value means the card is easier to remember.
   */
  easeFactor: number;
}

/**
 * Represents a single row of card data imported from a CSV file.
 * The property names correspond to the expected CSV header names,
 * mapped to simpler English terms.
 */
export interface CsvCardData {
  /** The question number or identifier. */
  id: string;
  /** The importance level of the question. */
  importance: string;
  /** The text of the question (front of the card). */
  front: string;
  /** The correct answer to the question (back of the card). */
  back: string;
  /** Tags or commentary for the question (originally '解説'). */
  tags: string;
}
