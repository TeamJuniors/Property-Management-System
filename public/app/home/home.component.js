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
var chat_service_1 = require("../services/chat-service");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ng2_facebook_sdk_js_1 = require("../../node_modules/ng2-facebook-sdk/dist/ng2-facebook-sdk.js");
var user_service_1 = require("../services/user-service");
var condominium_service_1 = require("../services/condominium-service");
var apartment_service_1 = require("../services/apartment-service");
var protocol_service_1 = require("../services/protocol-service");
var managerUnion_service_1 = require("../services/managerUnion-service");
var authentication_service_1 = require("../services/authentication-service");
var alert_service_1 = require("../services/alert-service");
var controlUnion_service_1 = require("../services/controlUnion-service");
var townshipMessage_service_1 = require("../services/townshipMessage-service");
var HomeComponent = (function () {
    function HomeComponent(userService, chatService, fb, route, router, condominiumService, apartmentService, protocolService, managerUnionService, authenticationService, alertService, controlUnionService, townshipMessage) {
        var _this = this;
        this.userService = userService;
        this.chatService = chatService;
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.condominiumService = condominiumService;
        this.apartmentService = apartmentService;
        this.protocolService = protocolService;
        this.managerUnionService = managerUnionService;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.controlUnionService = controlUnionService;
        this.townshipMessage = townshipMessage;
        this.isLogged = false;
        this.isManager = false;
        this.showApartment = false;
        this.showProtocol = false;
        this.showUnion = false;
        console.log(localStorage.getItem('currentUser'));
        if (localStorage.getItem('currentUser') != undefined) {
            this.isLogged = true;
            var userNow = JSON.parse(localStorage.getItem('currentUser'));
            this.authenticationService.login(userNow.username, userNow.password)
                .subscribe(function (data) {
            }, function (error) {
                console.log("From error");
                _this.alertService.error('Your cerdenials are not valid please log in again', true);
                localStorage.removeItem('currentUser');
                _this.router.navigateByUrl('/login');
            });
        }
        else {
            this.isLogged = false;
        }
        var fbParams = {
            appId: '1064731376969661',
            xfbml: true,
            version: 'v2.6'
        };
        this.fb.init(fbParams);
        this.newImgUrl = '';
    }
    HomeComponent.prototype.sendTownshipMessage = function () {
        var title = $("#townshipTitle").val();
        var content = $("#townshipMessage").val();
        var msg = {
            from: this.user,
            title: title,
            content: content
        };
        this.townshipMessage.create(msg).subscribe(function (data) {
            console.log("create township message");
            console.log(data);
        }, function (err) {
            console.log("Cannot create township message");
        });
    };
    HomeComponent.prototype.addMemberToControlUnion = function () {
        var _this = this;
        console.log("Add member to control union");
        var name = $('#memberControlName').val();
        var isAddedThisUser = false;
        if (this.union.leader.username === name) {
            isAddedThisUser = true;
        }
        for (var i = 0; i < this.union.members.length; i++) {
            console.log(this.union.members[i]);
            if (this.union.members[i].username === name) {
                isAddedThisUser = true;
            }
        }
        if (!isAddedThisUser) {
            console.log("Search");
            var prop = {
                floatNumber: this.user.flatNumber,
                entrance: this.user.exitNumber,
                city: this.user.city,
                neighborhood: this.user.neighborhood
            };
            var member = {
                username: name
            };
            this.controlUnionService.addMemberToControlUnion(prop, member).subscribe(function (data) {
                console.log("Successfully added memeber to controlUnion");
                _this.union = data;
            }, function (err) {
                console.log("Cannot add control to union");
            });
        }
    };
    HomeComponent.prototype.changeLeader = function () {
        var _this = this;
        var name = $('#leaderName').val();
        var isAddedThisUser = false;
        if (this.union.leader.username === name) {
            isAddedThisUser = true;
        }
        for (var i = 0; i < this.union.members.length; i++) {
            if (this.union.members[i].username === name) {
                isAddedThisUser = true;
            }
        }
        if (!isAddedThisUser) {
            var prop = {
                floatNumber: this.user.flatNumber,
                entrance: this.user.exitNumber,
                city: this.user.city,
                neighborhood: this.user.neighborhood
            };
            var leader = {
                username: name
            };
            this.controlUnionService.changeLeaderName(prop, leader).subscribe(function (data) {
                _this.union = data;
            }, function (err) {
                console.log("Error change leader");
            });
        }
    };
    HomeComponent.prototype.onApartmentTableClick = function (index) {
        console.log("Apartment click");
        this.showingApartment = this.apartments[index];
        this.showApartment = true;
    };
    HomeComponent.prototype.onProtocolTableClick = function (index) {
        this.showingProtocol = this.protocols[index];
        this.showProtocol = true;
    };
    HomeComponent.prototype.onProtocolsClick = function () {
        var _this = this;
        this.protocolService.getAll().subscribe(function (data) {
            _this.protocols = data;
            console.log("Protocols");
            console.log(_this.protocols);
        }, function (err) {
            console.log("Cannot get protocols");
        });
    };
    HomeComponent.prototype.onControlUnionClick = function () {
        var _this = this;
        this.showUnion = true;
        this.unionType = "control";
        var prop = {
            floatNumber: this.user.flatNumber,
            entrance: this.user.exitNumber,
            city: this.user.city,
            neighborhood: this.user.neighborhood
        };
        this.controlUnionService.getByProperties(prop).subscribe(function (data) {
            console.log("Get control union");
            console.log(data);
            _this.union = data;
        }, function (err) {
            var arr = [];
            var p = {
                leader: {
                    username: 'Неизвестен'
                },
                members: arr,
                floatNumber: _this.user.flatNumber,
                entrance: _this.user.exitNumber,
                city: _this.user.city,
                neighborhood: _this.user.neighborhood
            };
            console.log("Error get ControlUnion");
            _this.controlUnionService.create(p).subscribe(function (data) {
                console.log("Created control union");
                console.log(data);
                _this.union = data;
            }, function (err) {
                console.log("Cannot create control union");
            });
        });
    };
    HomeComponent.prototype.changeCashier = function () {
        var _this = this;
        var name = $('#cashierName').val();
        var isAddedThisUser = false;
        if (this.union.manager.username === name) {
            isAddedThisUser = true;
        }
        if (this.union.cashier.username === name) {
            isAddedThisUser = true;
        }
        for (var i = 0; i < this.union.members.length; i++) {
            if (this.union.members[i].username === name) {
                isAddedThisUser = true;
            }
        }
        if (!isAddedThisUser) {
            var prop = {
                floatNumber: this.user.flatNumber,
                entrance: this.user.exitNumber,
                city: this.user.city,
                neighborhood: this.user.neighborhood
            };
            var cashier = {
                username: name
            };
            this.managerUnionService.changeCashierName(prop, cashier).subscribe(function (data) {
                _this.union = data;
            }, function (err) {
                console.log("Error change cashier");
            });
        }
    };
    HomeComponent.prototype.addMemberToManagerUnion = function () {
        var _this = this;
        var name = $('#memberName').val();
        var isAddedThisUser = false;
        if (this.union.manager.username === name) {
            isAddedThisUser = true;
        }
        if (this.union.cashier.username === name) {
            isAddedThisUser = true;
        }
        for (var i = 0; i < this.union.members.length; i++) {
            console.log(this.union.members[i]);
            if (this.union.members[i].username === name) {
                isAddedThisUser = true;
            }
        }
        if (!isAddedThisUser) {
            var prop = {
                floatNumber: this.user.flatNumber,
                entrance: this.user.exitNumber,
                city: this.user.city,
                neighborhood: this.user.neighborhood
            };
            var member = {
                username: name
            };
            this.managerUnionService.addMemberToManagerUnion(prop, member).subscribe(function (data) {
                console.log("Successfully added memeber to managerUnion");
                _this.union = data;
            }, function (err) {
                console.log("Cannot add manager to union");
            });
        }
    };
    HomeComponent.prototype.onManagerUnionClick = function () {
        var _this = this;
        this.showUnion = true;
        this.unionType = "manager";
        var prop = {
            floatNumber: this.user.flatNumber,
            entrance: this.user.exitNumber,
            city: this.user.city,
            neighborhood: this.user.neighborhood
        };
        this.managerUnionService.getByProperties(prop).subscribe(function (data) {
            _this.union = data;
        }, function (err) {
            var arr = [];
            var p = {
                cashier: {
                    username: 'Неизвестен'
                },
                manager: _this.user,
                members: arr,
                floatNumber: _this.user.flatNumber,
                entrance: _this.user.exitNumber,
                city: _this.user.city,
                neighborhood: _this.user.neighborhood
            };
            console.log("Error get managerUnion");
            _this.managerUnionService.create(p).subscribe(function (data) {
                console.log("Created manager union");
                _this.union = data;
            }, function (err) {
                console.log("Cannot create manager union");
            });
        });
    };
    HomeComponent.prototype.returnUnionPage = function () {
        console.log("Exit union.");
        this.showUnion = false;
    };
    HomeComponent.prototype.returnApartmentPage = function () {
        this.showApartment = false;
    };
    HomeComponent.prototype.returnProtocolPage = function () {
        this.showProtocol = false;
    };
    HomeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.apartments = [];
        this.condominiumService.getByProperties(this.user).subscribe(function (data) {
            for (var i = 0; i < data.apartments.length; i++) {
                _this.apartmentService.getByProperties(data.apartments[i]).subscribe(function (data) {
                    console.log(data);
                    _this.apartments.push(data);
                }, function (err) {
                    console.log("Cannot get apartment");
                });
            }
            _this.condominium = data;
        }, function (err) {
            console.log("Error in home get condominium");
        });
        //setPopup();
    };
    HomeComponent.prototype.ngOnInit = function () {
        console.log("OnInit");
        if (localStorage.getItem('currentUser')) {
            this.isLogged = true;
            this.user = JSON.parse(localStorage.getItem('currentUser'));
            this.isManager = this.user.manager;
            this.username = this.user.username;
            var activeEl = 0;
            //Setting defalt image
            this.user.imgUrl = this.user.imgUrl || 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg';
            $(function () {
                var items = $('.btn-nav');
                $(items[activeEl]).addClass('active');
                $(".btn-nav").click(function () {
                    $(items[activeEl]).removeClass('active');
                    $(this).addClass('active');
                    activeEl = $(".btn-nav").index(this);
                });
            });
            console.log("LOADED");
        }
        else {
            this.isLogged = false;
        }
    };
    HomeComponent.prototype.ngOnChange = function () {
        console.log("OnChange");
        if (localStorage.getItem('currentUser')) {
            this.isLogged = true;
        }
        else {
            this.isLogged = false;
        }
    };
    HomeComponent.prototype.uploadImageClick = function () {
        var _this = this;
        this.userService.changeImage(this.user, this.newImgUrl)
            .subscribe(function (newUser) {
            console.log('Upload Image');
            console.log(newUser);
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            _this.user.imgUrl = newUser.imgUrl;
            _this.newImgUrl = '';
        }, function (error) {
            console.log("Upload error");
            console.log(error);
            //this.alertService.error(error);
            //this.loading = false;
        });
    };
    HomeComponent.prototype.logout = function () {
        console.log("Test");
        var username = JSON.parse(localStorage.getItem('currentUser')).username;
        localStorage.removeItem('currentUser');
        this.isLogged = false;
        this.chatService.logoutUser(username);
    };
    HomeComponent.prototype.facebookLoginClick = function () {
        var _this = this;
        this.fb.login().then(function (response) {
            console.log("Facebook response");
            console.log(response);
            if (response.status === 'connected') {
                localStorage.setItem('facebookAuthToken', response.authResponse.userID);
                _this.router.navigateByUrl('/login/facebook');
            }
        }, function (error) {
        });
    };
    HomeComponent.prototype.createProtocol = function () {
        var _this = this;
        var number = $("#login_username").val();
        var content = $("#login_password").val();
        var date = Date.now();
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = dd + '/' + mm + '/' + yyyy;
        console.log(number + " " + content + " " + today);
        $(".close").click();
        var properties = {
            number: number,
            content: content,
            date: today,
            floatNumber: this.user.flatNumber,
            entrance: this.user.exitNumber,
            city: this.user.city,
            neighborhood: this.user.neighborhood
        };
        Promise.resolve(this.protocolService.create(properties).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log("Cannot create protocol");
        })).then(function () {
            _this.protocolService.getAll().subscribe(function (data) {
                _this.protocols = data;
                console.log("Protocols");
                console.log(_this.protocols);
            }, function (err) {
                console.log("Cannot get protocols");
            });
        });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'app',
        templateUrl: 'app/home/home.component.html',
        styles: ["\n        .pointer-mouse {\n            cursor: pointer;\n        }\n    "]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        chat_service_1.ChatService,
        ng2_facebook_sdk_js_1.FacebookService,
        router_1.ActivatedRoute,
        router_1.Router,
        condominium_service_1.CondominiumService,
        apartment_service_1.ApartmentService,
        protocol_service_1.ProtocolService,
        managerUnion_service_1.ManagerUnionService,
        authentication_service_1.AuthenticationService,
        alert_service_1.AlertService,
        controlUnion_service_1.ControlUnionService,
        townshipMessage_service_1.TownshipMessageService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
function setPopup() {
    var $formLogin = $('#login-form');
    var $formLost = $('#lost-form');
    var $formRegister = $('#register-form');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;
    $('#login_register_btn').click(function () { modalAnimate($formLogin, $formRegister); });
    $('#register_login_btn').click(function () { modalAnimate($formRegister, $formLogin); });
    $('#login_lost_btn').click(function () { modalAnimate($formLogin, $formLost); });
    $('#lost_login_btn').click(function () { modalAnimate($formLost, $formLogin); });
    $('#lost_register_btn').click(function () { modalAnimate($formLost, $formRegister); });
    $('#register_lost_btn').click(function () { modalAnimate($formRegister, $formLost); });
    function modalAnimate($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height", $oldH);
        $oldForm.fadeToggle($modalAnimateTime, function () {
            $divForms.animate({ height: $newH }, $modalAnimateTime, function () {
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }
    function msgFade($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function () {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }
    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function () {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
        }, $msgShowTime);
    }
}
//# sourceMappingURL=home.component.js.map