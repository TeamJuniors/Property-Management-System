import { AlertService } from '../services/alert-service';
import { FeedbackService } from '../services/feedback-service';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'feedback-form',
    templateUrl: '/app/feedback/feedback-form.component.html',
    providers: [
        FeedbackService
    ]
})
export class FeedbackFormComponent implements OnInit {
    constructor(private feedbackService: FeedbackService, private alertService: AlertService) { }

    ngOnInit() { }

    sendFeedback() {
        const name = $('#feedback-name').val();
        const email = $('#feedback-email').val();
        const phoneNumber = $('#feedback-phone').val();
        const message = $('#feedback-message').val();

        this.feedbackService.createFeedbackRequest(name, email, phoneNumber, message)
            .subscribe((x) => {
                $('#feedback-name').val('');
                $('#feedback-email').val('');
                $('#feedback-phone').val('');
                $('#feedback-message').val('');

                if(x.wasSuccessfull) {
                    this.alertService.success(x.message, true);
                } else {
                    this.alertService.error(x.message, true);
                }
            });
    }
}