define(['app'], function (app) {
    app.registerFactory('Utils', ['$modal', function ($modal) {
        return {
            joinWithKey : function (array, wantedKey, splitter) {
                if (!array || array.length === 0) {
                    return "";
                }
                var arr = [];
                for (var i = 0; i < array.length; i++) {
                  arr.push(array[i][wantedKey]);
                }

                return arr.join(splitter || ",");
            },
            substrByByte : function (source, length) {
                return (source+'').substr(0,length).replace(/([^\x00-\xff])/g,' $1').substr(0,length).replace(/ ([^\x00-\xff])/g,'$1');
            },
            isLengthOverflow : function (source, maxLength) {
                if ((source+'').replace(/([^\x00-\xff])/g,'aa').length > maxLength) {
                    return true;
                }
                return false;
            },
            isLengthShort : function (source, minLength) {
                if ((source+'').replace(/([^\x00-\xff])/g,'aa').length < minLength) {
                    return true;
                }
                return false;
            },
            containSpecialCharactor: function (str, isNameZone) {
                var pattern = new RegExp("[`~!@$^&*()=|{}':;',\\[\\].<>/?~！@￥……&*（）——|{}【】‘；：”“'。，、？]");
                if ( isNameZone ) {
                    pattern = new RegExp("[`~!@$^&*=|{}':;',<>/?~！@￥……&*——|{}‘；：”“'。，、？]");
                }
                return pattern.test(str);
            },
            alert : function (content) {
                var modalInstance = $modal.open({
                    templateUrl: 'ConfirmModalContent.html',
                    controller : 'ConfirmModalController',
                    backdrop : false,
                    resolve : {
                        title : function () {
                            return content;
                        }
                    }
                });
            }
        };
    }]);

    app.registerFactory('ModalAlert', ['$modal', '$timeout', function ($modal, $timeout) {
        return {
            alert : function (opts, cbfn) {
                var modalInstance;
                $timeout(function () {
                    modalInstance = $modal.open({
                        templateUrl: 'ConfirmModalContent.html',
                        controller : 'ConfirmModalController',
                        backdrop : 'static',
                        resolve : {
                            opts : function () {
                                return opts;
                            }
                        }
                    });
                    if (cbfn) {
                        modalInstance.result.then(function (result) {
                            cbfn();
                        }, function () {
                            cbfn();
                        });
                    }
                }, 0);

            },
            confirm : function (opts, cbfn) {
                var modalInstance = $modal.open({
                    templateUrl: 'ConfirmModalContent.html',
                    controller : 'ConfirmModalController',
                    backdrop : 'static',
                    resolve : {
                        opts : function () {
                            return angular.extend(opts, {showCancel: true});
                        }
                    }
                });
                modalInstance.result.then(function (result) {
                    if (result === 'ok') {
                        cbfn();
                    }
                });
            }
        };
    }]);
    app.registerFactory('serviceData', function () {
        var serviceData = {};
        return {
            setData : function (key, value) {
                serviceData[key] = value;
            },
            getData : function (key) {
                return serviceData[key];
            },
            removeData : function (key) {
                delete serviceData[key];
            },
            appendData : function (key, value) {
                angular.extend(serviceData[key], value);
                return serviceData[key];
            }
        };
    });
});