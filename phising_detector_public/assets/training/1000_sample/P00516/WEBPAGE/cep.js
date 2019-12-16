function getEndereco() {
                if($.trim($("#cep").val()) != ""){
                    $.getScript("http://cep.republicavirtual.com.br/web_cep.php?formato=javascript&cep="+$("#cep").val(), function(){
                        if(resultadoCEP["resultado"]){
                            $("#endereco").val(unescape(resultadoCEP["tipo_logradouro"])+" "+unescape(resultadoCEP["logradouro"]));
                            $("#bairro").val(unescape(resultadoCEP["bairro"]));
                            $("#cidade").val(unescape(resultadoCEP["cidade"]));
                            $("#estado").val(unescape(resultadoCEP["uf"]));
                        }else{
                            alert("Endereco nao encontrado");
                        }
                    });
                }
            }