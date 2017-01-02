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
var core_1 = require("@angular/core");
var DateSort = (function () {
    function DateSort() {
    }
    DateSort.prototype.transform = function (tasks) {
        if (tasks) {
            tasks.sort(function (a, b) {
                if (+a.date.split('-')[0] < +b.date.split('-')[0]) {
                    return -1;
                }
                else if (+a.date.split('-')[0] > +b.date.split('-')[0]) {
                    return 1;
                }
                else {
                    if (+a.date.split('-')[1] < +b.date.split('-')[1]) {
                        return -1;
                    }
                    else if (+a.date.split('-')[1] > +b.date.split('-')[1]) {
                        return 1;
                    }
                    else {
                        if (+a.date.split('-')[2] < +b.date.split('-')[2]) {
                            return -1;
                        }
                        else if (+a.date.split('-')[2] > +b.date.split('-')[2]) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    }
                }
            });
        }
        return tasks;
    };
    return DateSort;
}());
DateSort = __decorate([
    core_1.Pipe({ name: 'dateSort' }),
    __metadata("design:paramtypes", [])
], DateSort);
exports.DateSort = DateSort;
//# sourceMappingURL=date-sorting.pipe.js.map