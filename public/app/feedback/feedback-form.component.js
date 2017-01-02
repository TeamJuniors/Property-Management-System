"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var alert_service_1 = require("../services/alert-service");
var feedback_service_1 = require("../services/feedback-service");
var core_1 = require("@angular/core");
var FeedbackFormComponent = (function () {
    function FeedbackFormComponent(feedbackService, alertService) {
        this.feedbackService = feedbackService;
        this.alertService = alertService;
    }
    FeedbackFormComponent.prototype.ngOnInit = function () { };
    FeedbackFormComponent.prototype.sendFeedback = function () {
        var _this = this;
        var name = $('#feedback-name').val();
        var email = $('#feedback-email').val();
        var phoneNumber = $('#feedback-phone').val();
        var message = $('#feedback-message').val();
        this.feedbackService.createFeedbackRequest(name, email, phoneNumber, message)
            .subscribe(function (x) {
            $('#feedback-name').val('');
            $('#feedback-email').val('');
            $('#feedback-phone').val('');
            $('#feedback-message').val('');
            if (x.wasSuccessfull) {
                _this.alertService.success(x.message, true);
            }
            else {
                _this.alertService.error(x.message, true);
            }
        });
    };
    return FeedbackFormComponent;
}());
FeedbackFormComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'feedback-form',
        templateUrl: '/app/feedback/feedback-form.component.html',
        providers: [
            feedback_service_1.FeedbackService
        ]
    }),
    __metadata("design:paramtypes", [feedback_service_1.FeedbackService, alert_service_1.AlertService])
], FeedbackFormComponent);
exports.FeedbackFormComponent = FeedbackFormComponent;
//# sourceMappingURL=feedback-form.component.js.map