(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    
})(jQuery);










document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('serviceForm');
    const phoneInput = document.getElementById('clientPhone');

    // ✅ Máscara de telefone: (XX) XXXXX-XXXX
    phoneInput.addEventListener('input', function (e) {
        let input = e.target.value.replace(/\D/g, ''); // remove tudo que não é número

        if (input.length > 11) input = input.slice(0, 11); // limita a 11 dígitos

        let formatted = input;

        if (input.length >= 1) {
            formatted = '(' + input.substring(0, 2);
        }
        if (input.length >= 3) {
            formatted += ') ' + input.substring(2, 7);
        }
        if (input.length >= 8) {
            formatted += '-' + input.substring(7, 11);
        }

        e.target.value = formatted;
    });

    // ✅ Envio do formulário
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Obter os valores do formulário
        const nome = document.getElementById('clientName').value.trim();
        const telefone = phoneInput.value.trim();
        const endereco = document.getElementById('serviceLocation').value.trim();
        const servico = document.getElementById('serviceType').value;
        const aparelho = document.getElementById('deviceStatus').value;
        const eletrica = document.getElementById('electricalPoints').value;
        const acesso = document.getElementById('easyAccess').value;
        const substituicao = document.getElementById('replacement').value;
        const particularidades = document.getElementById('particularities').value.trim() || "Nenhuma";

        // ✅ Validação do telefone com formato (XX) XXXXX-XXXX
        const telefoneValido = /^\(\d{2}\)\s\d{5}-\d{4}$/;

        // ✅ Validações manuais
        if (nome.length < 3) {
            alert("Por favor, insira seu nome completo (mínimo 3 caracteres).");
            return;
        }

        if (!telefoneValido.test(telefone)) {
            alert("Por favor, insira um número de telefone válido no formato (99) 99999-9999.");
            return;
        }

        if (endereco.length < 5) {
            alert("Por favor, insira um endereço válido (mínimo 5 caracteres).");
            return;
        }

        if (!servico) {
            alert("Por favor, selecione o tipo de serviço.");
            return;
        }

        if (!aparelho) {
            alert("Por favor, selecione se o aparelho é novo ou usado.");
            return;
        }

        if (!eletrica) {
            alert("Por favor, informe se há ponto elétrico adequado.");
            return;
        }

        if (!acesso) {
            alert("Por favor, informe se há acesso fácil ao local.");
            return;
        }

        if (!substituicao) {
            alert("Por favor, informe se haverá substituição de equipamento.");
            return;
        }

        // ✅ Montar a mensagem
        let mensagem = `Olá! Gostaria de solicitar um atendimento:\n\n`;
        mensagem += `👤 *Nome:* ${nome}\n`;
        mensagem += `📞 *Telefone:* ${telefone}\n`;
        mensagem += `📍 *Endereço:* ${endereco}\n`;
        mensagem += `🛠️ *Serviço desejado:* ${servico}\n\n`;
        mensagem += `🔧 *Aparelho:* ${aparelho}\n`;
        mensagem += `⚡ *Ponto elétrico adequado:* ${eletrica}\n`;
        mensagem += `🚪 *Acesso fácil ao local:* ${acesso}\n`;
        mensagem += `♻️ *Substituição de equipamento:* ${substituicao}\n`;
        mensagem += `📝 *Particularidades:* ${particularidades}\n`;

        const mensagemCodificada = encodeURIComponent(mensagem);

        // ⚠️ Substitua pelo número real do seu WhatsApp (com DDI + DDD + número)
        const numeroWhatsApp = "5571992223788";

        // ✅ Criar link e abrir o WhatsApp
        const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
        window.open(linkWhatsApp, '_blank');
    });
});

