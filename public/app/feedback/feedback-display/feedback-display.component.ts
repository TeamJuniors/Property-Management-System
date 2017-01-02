import { Feedback } from '../../models/feedback-model';
import { FeedbackService } from '../../services/feedback-service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'feedback-display',
    templateUrl: '/app/feedback/feedback-display/feedback-display.component.html',
    styleUrls: [
        'app/feedback/feedback-display/feedback-display.component.css'
    ],
    providers: [
        FeedbackService
    ]
})
export class FeedbackDisplayComponent implements OnInit {
    feedback: Feedback[];

    shouldShowFeedback: boolean;

    showHide: string;

    constructor(private feedbackService: FeedbackService) { }

    ngOnInit() {
        this.feedback = [];
        this.shouldShowFeedback = false;
        this.showHide = 'Покажи';
    }

    showFeedback() {
        if (this.shouldShowFeedback) {
            this.shouldShowFeedback = false;
            this.showHide = 'Покажи';
        } else {
            this.feedbackService.getFeedback()
                .subscribe((x) => {
                    this.feedback = x;
                    this.shouldShowFeedback = true;
                    this.showHide = 'Скрий';
                });
        }
    }
}