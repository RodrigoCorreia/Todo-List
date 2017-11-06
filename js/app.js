$(document).ready(function(){
	'use strict';
	
	function contTodoList() {// conta quantidade de To-do
        var x = document.getElementById("todo-list").getElementsByTagName("li");
		return x.length;
    }
	
	function contaChecked() {// conta quantidade de checkeds
        var x = 0;
        for (var i = 0; i < $("input.toggle").length; i++) { //percorre os imputs buscanso aqueles que estão com checked
            if ($("input.toggle")[i].checked)  //incrementa se achou
                x++;
        }
        return x; //retorna
    }
		
	function contaUnchecked(){ // conta quantos faltam
		var x = contTodoList() - contaChecked();
		return x;		
	}
		
	function marcarTodosCompletos() {// marca todos como completo
            var inputs = document.getElementsByClassName("toggle");
			
			if(document.getElementById("toggle-all").checked == false) { //se toogle-all não esta marcado
				for (var i = 0; i < inputs.length; i++) { //percorre todas as classe e coloca atributo unchecked
					inputs[i].setAttribute("checked", false);
					inputs[i].checked = false;
					inputs[i].parentNode.parentNode.removeAttribute('class', 'completed');
				}
				document.getElementById("toggle-all").removeAttribute('checked');
			} else { // se toogle-all esta marcado
				for (var i = 0; i < inputs.length; i++) {  //percorre todas as classe e coloca atributo checked
					inputs[i].setAttribute("checked", true);
					inputs[i].checked = true;
					inputs[i].parentNode.parentNode.setAttribute('class', 'completed');
				}
				document.getElementById("toggle-all").setAttribute('checked', 'true');
			
			}
    }

	function escondeMostraMainFooter() {//Esconde e moestra o main e footer
            var x = document.getElementById("main");
            var y = document.getElementById("footer");
			if (contTodoList() == 0) { // se não tem nada esconde
               x.setAttribute("style", "display: none");
               y.setAttribute("style", "display: none");
            }else{ // se não mostra
               x.setAttribute("style", "display: block");
               y.setAttribute("style", "display: block");				
			}
        }

	function escondeMostraClearCompleted() {//Esconde e mostra o clear Completed
            var x = document.getElementById("clear-completed");
			if (contaChecked() == 0) { // se checked é igual a 0, esconde clear completed
               x.setAttribute("style", "display: none");
            }else{ // se não, mostra clear completed
               x.setAttribute("style", "display: block");
			}
        }
	
	function escondeMostraToogleAll(){ // esocnde e mostra toogle-all
		if(contaUnchecked() == 0){ // se estão todos marcados no toogle-all
			if(document.getElementById("toggle-all").checked == false){ // se toogle-all não esta marcado
				document.getElementById("toggle-all").checked = true;
			}

		}else{ // se tem alguem sem marcar
			if(document.getElementById("toggle-all").checked == true){ // se toogle-all esta marcado
				document.getElementById("toggle-all").checked = false;
				}

		}
	}
	
	function esconder(booleano) {// Esconde os ativos ou inativos dependendo do valor do boolean, true para ativos e false para inativos
	    var x = document.getElementsByClassName("toggle");
        var y = document.getElementById("todo-list").getElementsByTagName("li");
            for (var i = 0; i < x.length; i++) { //percorre todos os toogle
                if (x[i].checked == booleano) // verifica se o valor de checked esta true ou false a depender do parametro
                    y[i].setAttribute("style", "display:none"); // se não esconde o toogle
                else
                    y[i].setAttribute("style", "display:block"); // se sim mostra o toogle
            }
    }	
	
	function removeMarcacao() {// Remove as marcaçoes dos botões de baixo; todos, ativos e completos
	    var x = document.getElementsByClassName("a");
        var y = document.getElementById("filters").getElementsByTagName("href");
            for (var i = 0; i < x.length; i++) { // percorre todos elementos a
                if (x[i].class() == "selected"){ // se esta marcado desmarca
                    x[i].removeClass("selected");
				}
            }
    }

	function mostraTudo() {// mostra todos os elementos de li
	    var x = document.getElementsByClassName("toggle");
        var y = document.getElementById("todo-list").getElementsByTagName("li");
            for (var i = 0; i < x.length; i++) { // pertorre todos os toogle
                    y[i].setAttribute("style", "display:block"); // mostra todos os toogle
            }
    }	
	
	function marcaTodosCompletos() {// Marca todos os completos
            for (var i = 0; i < $("input.toggle").length; i++) { // percorre todos os input.toogle
				if ($("input.toggle.class") == "completed"){ // se tem a classe completed não faz nada
					
				
				}else{ // se não insere a classe
					$("input.toggle").parent().parent().addClass("completed");
					$("input.toggle").addClass("checked");
				}

            }
    }	
	
	function atualizaContador(){ // função para atualizar o contador
		var faltam = contaUnchecked();

		if(faltam == 0){ // se for zero
				$('#todo-count').html('<span id="todo-count"><strong></strong> Nenhum item </span>'); //muda o texto no html
		}else{
			if(faltam == 1){ // se for 1
				$('#todo-count').html('<span id="todo-count"><strong> ' + faltam + '</strong> item  restante </span>'); //muda o texto no html
			}else{ // se for outro numero
				$('#todo-count').html('<span id="todo-count"><strong> '  + faltam + '</strong> itens restantes</span>'); //muda o texto no html
			}
		}
		escondeMostraMainFooter();
		escondeMostraClearCompleted();
		escondeMostraToogleAll();	
	}
	
	
	var Create = function(num) { // cria um novo todo
			
		var container = $('#todo-list');
		var content = '<li id= "' + num + '">'; // cria uma string contendo o codigo html de um novo todo com id
		content += '<div class="view">';
		content += '<input class="toggle" type="checkbox">';
		content += '<label>'+ $('#new-todo').val().trim() +'</label>';
		content += '<button class="destroy"></button>';
		content += '</div>';
		content += '<input class="edit" value="Rule the web">';
		content += '</li>';
			
		if ($('#new-todo').val().trim() != ''){ // garante não inserir elementos vazios ou com espacos
			$(container).prepend(content); // insere new todo
			$('#new-todo').val(''); // limpa o input
			atualizaContador(); // autualiza o contador de numeto de tarefas
		}
	
	}
	
	var num =2; // inicia o numero de id de todos os todo
	escondeMostraMainFooter(); //esconde para inicializar
	$(document).keypress(function(e) {
		if(e.which == 13) { // Se apertar enter
			Create(num); //cria novo todo com o id
			num++;
			
		}
	});
	
	
	$(document).on("click", "input.toggle", function(){ // escuta click em input.toggle
		var x= $(this).parent().parent().attr('class'); // busca o avô li
		if( x == "completed"){ // se esta competo remove a classe
			$(this).parent().parent().removeClass("completed");	// muda o avô li
			atualizaContador();
			}else{ // se não adiciona classe
			$(this).parent().parent().addClass("completed");// muda o avô li
			atualizaContador();
		}
	});	
	
	$(document).on("click","a[href='#/active']", function(){ // escuta click em ativos
		esconder(true);
		$(this).parent().siblings().children().removeClass("selected");
		$(this).addClass("selected"); // marca como selecionado
	});	

	$(document).on("click","a[href='#/completed']", function(){ // escuta click em completo
		esconder(false);
		$(this).parent().siblings().children().removeClass("selected");
		$(this).addClass("selected"); // marca como selecionado
	});		
	
	$(document).on("click","a[href='#/mostraTudo']", function(){ // escuta click em mostrar tudo
		mostraTudo();
		$(this).parent().siblings().children().removeClass("selected");
		$(this).addClass("selected"); // marca como selecionado
	});	
	
	$(document).on("click","#clear-completed", function(){ // escuta click limpar todos completos
		$('.completed').remove();
		atualizaContador();
	});
	
	$(document).on("click","button.destroy", function(){ // escuta click no botão remover li
		$(this).parent().parent().remove(); // remove li
		atualizaContador();
	});

	$(document).on("click","#toggle-all", function(){ // escuta click marcar todos completos
		marcarTodosCompletos();
		atualizaContador();
	});
	
	$(document).on("dblclick", "label", function(){ // escuta click em label
		var save = $(this).text();
		var load =$(this).text();
		$(this).parent().parent().addClass("editing");
		$(this).parent().parent().find('input').focus();
		
		$(this).parent().siblings().val(save);
		$(this).parent().siblings().keyup(function(e) {
			if(e.which == 13) { // Se apertar enter
				if ($(this).val().trim() != ''){
				$(this).siblings().children("label").html($(this).val().trim());
				$(this).parent().removeClass("editing");
				}
			}else{
				if(e.which == 27) { // Se apertar esc
				$(this).parent().removeClass("editing");
				}
			}
		});
				
	});	
	
	

});