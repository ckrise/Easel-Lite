webpackJsonp(["main"],{

/***/ "./src/client/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/client/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/client/app/api.service.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var ApiService = /** @class */ (function () {
    function ApiService(httpClient) {
        this.httpClient = httpClient;
        this.jsonOptions = {
            headers: { 'Content-Type': 'application/json' }
        };
    }
    ApiService.prototype.getClasses = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = '/api/classes';
                        return [4 /*yield*/, this.httpClient.get(url).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiService.prototype.getClassById = function (classid) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/api/classes/" + classid;
                        return [4 /*yield*/, this.httpClient.get(url).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiService.prototype.updateClass = function (classData) {
        return __awaiter(this, void 0, void 0, function () {
            var classid, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        classid = classData.department + classData.number;
                        url = "/api/classes/" + classid;
                        return [4 /*yield*/, this.httpClient.put(url, JSON.stringify(classData), this.jsonOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiService.prototype.deleteClass = function (classid) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = '/api/classes/${classid}';
                        return [4 /*yield*/, this.httpClient.delete(url).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiService.prototype.createClass = function (classData) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/api/classes";
                        return [4 /*yield*/, this.httpClient.post(url, JSON.stringify(classData), this.jsonOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiService.prototype.getUsersByRole = function (role) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/api/users/?role=" + role;
                        return [4 /*yield*/, this.httpClient.get(url).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;


/***/ }),

/***/ "./src/client/app/app-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var homepage_component_1 = __webpack_require__("./src/client/app/homepage/homepage.component.ts");
var classes_component_1 = __webpack_require__("./src/client/app/classes/classes.component.ts");
var class_detail_component_1 = __webpack_require__("./src/client/app/class-detail/class-detail.component.ts");
var routes = [
    { path: '', component: homepage_component_1.HomepageComponent },
    { path: 'classes', component: classes_component_1.ClassesComponent },
    { path: 'classes/:classid', component: class_detail_component_1.ClassDetailComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;


/***/ }),

/***/ "./src/client/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/client/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "./src/client/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'Easel Lite';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'el-root',
            template: __webpack_require__("./src/client/app/app.component.html"),
            styles: [__webpack_require__("./src/client/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "./src/client/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var app_component_1 = __webpack_require__("./src/client/app/app.component.ts");
var app_routing_module_1 = __webpack_require__("./src/client/app/app-routing.module.ts");
var homepage_component_1 = __webpack_require__("./src/client/app/homepage/homepage.component.ts");
var classes_component_1 = __webpack_require__("./src/client/app/classes/classes.component.ts");
var api_service_1 = __webpack_require__("./src/client/app/api.service.ts");
var class_detail_component_1 = __webpack_require__("./src/client/app/class-detail/class-detail.component.ts");
var not_found_component_1 = __webpack_require__("./src/client/app/not-found/not-found.component.ts");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                homepage_component_1.HomepageComponent,
                classes_component_1.ClassesComponent,
                class_detail_component_1.ClassDetailComponent,
                not_found_component_1.NotFoundComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                app_routing_module_1.AppRoutingModule
            ],
            providers: [api_service_1.ApiService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/client/app/class-detail/class-detail.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/client/app/class-detail/class-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"example\">\r\n    <form onsubmit=\"return false\">\r\n        <h3>Class Details</h3>\r\n        <table>\r\n            <tbody>\r\n                <tr>\r\n                    <td>Department:</td>\r\n                    <td>\r\n                        <input maxlength=\"4\" minlength=\"4\" name=\"department\" required=\"\" type=\"text\" value={{class.department}}>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td>Number:</td>\r\n                    <td>\r\n                        <input max=\"999\" min=\"100\" name=\"number\" required=\"\" type=\"number\" value={{class.number}}>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td>Title:</td>\r\n                    <td>\r\n                        <input name=\"title\" required=\"\" type=\"text\" value={{class.title}}>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td>Teacher:</td>\r\n                    <td>\r\n                        <select name=\"teacher\" required=\"\">\r\n            <option *ngFor=\"let teacher of teachers\" [selected]=\"teacher === class.teacher\">\r\n              {{teacher.firstname}} {{teacher.lastname}}\r\n            </option>\r\n          </select>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td colspan=\"2\" style=\"text-align: right\">\r\n                        <input style=\"margin-right: 3em;\" value=\"Delete\" type=\"button\">\r\n                        <input value=\"Cancel\" type=\"button\">\r\n                        <input value=\"Save\" type=\"submit\">\r\n                    </td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n    </form>\r\n</div>"

/***/ }),

/***/ "./src/client/app/class-detail/class-detail.component.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var api_service_1 = __webpack_require__("./src/client/app/api.service.ts");
var ClassDetailComponent = /** @class */ (function () {
    function ClassDetailComponent(activatedRoute, apiService) {
        this.activatedRoute = activatedRoute;
        this.apiService = apiService;
    }
    ClassDetailComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.activatedRoute.params.subscribe(function (params) { return __awaiter(_this, void 0, void 0, function () {
                            var classid, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        classid = params.classid;
                                        _a = this;
                                        return [4 /*yield*/, this.apiService.getClassById(classid)];
                                    case 1:
                                        _a.class = _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        _a = this;
                        return [4 /*yield*/, this.apiService.getUsersByRole('teacher')];
                    case 1:
                        _a.teachers = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ClassDetailComponent = __decorate([
        core_1.Component({
            selector: 'el-class-detail',
            template: __webpack_require__("./src/client/app/class-detail/class-detail.component.html"),
            styles: [__webpack_require__("./src/client/app/class-detail/class-detail.component.css")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            api_service_1.ApiService])
    ], ClassDetailComponent);
    return ClassDetailComponent;
}());
exports.ClassDetailComponent = ClassDetailComponent;


/***/ }),

/***/ "./src/client/app/classes/classes.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/client/app/classes/classes.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"class-list\">\r\n  <h3>Class List</h3>\r\n  <table>\r\n  <tr *ngFor=\"let class of classData\">\r\n    <td>{{class.department}}</td>\r\n    <td>{{class.number}}</td>\r\n    <td>—</td>\r\n    <td class=\"link\">\r\n      <a routerLink=\"/classes/{{class.department}}{{class.number}}\">Details</a>\r\n    </td>\r\n    <td class=\"link\">\r\n      <a href=\"#\">Roster</a>\r\n    </td>\r\n  </tr>\r\n  </table>\r\n</div>\r\n<a href=\"#\">Create new class...</a>\r\n"

/***/ }),

/***/ "./src/client/app/classes/classes.component.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var api_service_1 = __webpack_require__("./src/client/app/api.service.ts");
var ClassesComponent = /** @class */ (function () {
    function ClassesComponent(apiService) {
        this.apiService = apiService;
        console.log('hello');
    }
    ClassesComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('ngOnInit');
                        _a = this;
                        return [4 /*yield*/, this.apiService.getClasses()];
                    case 1:
                        _a.classData = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ClassesComponent = __decorate([
        core_1.Component({
            selector: 'el-classes',
            template: __webpack_require__("./src/client/app/classes/classes.component.html"),
            styles: [__webpack_require__("./src/client/app/classes/classes.component.css")]
        }),
        __metadata("design:paramtypes", [api_service_1.ApiService])
    ], ClassesComponent);
    return ClassesComponent;
}());
exports.ClassesComponent = ClassesComponent;


/***/ }),

/***/ "./src/client/app/homepage/homepage.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/client/app/homepage/homepage.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <h1>Welcome to Easel Lite!</h1>\r\n  <ul>\r\n    <li><a routerLink=\"/classes\">Manage classes</a></li>\r\n  </ul>\r\n</div>\r\n"

/***/ }),

/***/ "./src/client/app/homepage/homepage.component.ts":
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var HomepageComponent = /** @class */ (function () {
    function HomepageComponent(router) {
        this.router = router;
    }
    HomepageComponent.prototype.ngOnInit = function () {
    };
    HomepageComponent = __decorate([
        core_1.Component({
            selector: 'el-homepage',
            template: __webpack_require__("./src/client/app/homepage/homepage.component.html"),
            styles: [__webpack_require__("./src/client/app/homepage/homepage.component.css")]
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], HomepageComponent);
    return HomepageComponent;
}());
exports.HomepageComponent = HomepageComponent;


/***/ }),

/***/ "./src/client/app/not-found/not-found.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/client/app/not-found/not-found.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>404</h2>\r\n"

/***/ }),

/***/ "./src/client/app/not-found/not-found.component.ts":
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var NotFoundComponent = /** @class */ (function () {
    function NotFoundComponent() {
    }
    NotFoundComponent.prototype.ngOnInit = function () {
    };
    NotFoundComponent = __decorate([
        core_1.Component({
            selector: 'el-not-found',
            template: __webpack_require__("./src/client/app/not-found/not-found.component.html"),
            styles: [__webpack_require__("./src/client/app/not-found/not-found.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], NotFoundComponent);
    return NotFoundComponent;
}());
exports.NotFoundComponent = NotFoundComponent;


/***/ }),

/***/ "./src/client/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};


/***/ }),

/***/ "./src/client/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("./src/client/app/app.module.ts");
var environment_1 = __webpack_require__("./src/client/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/client/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map