import * as express from 'express';
import Lesson from '../../entities/lesson.entity';
import Publication from '../../entities/publication.entitty';

declare global {
  namespace Express {
    interface Request {
      token: {
        id: string
      }
    }
  }
}