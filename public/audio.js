  // Substitua 'SEU_ID_DE_VIDEO' pelo ID do vídeo do YouTube que você deseja incorporar.
  var videoId = '4xDzrJKXOOY';

  // Configuração do player
  var player;
  function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
          height: '0', // Defina a altura para 0 para ocultar a janela de reprodução
          width: '0', // Defina a largura para 0 para ocultar a janela de reprodução
          videoId: videoId,
          playerVars: {
              autoplay: 1, // Inicia a reprodução automaticamente
              controls: 0, // Oculta os controles padrão do YouTube
          },
          events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
          }
      });
  }

  function onPlayerReady(event) {
      // O vídeo está pronto para ser reproduzido, mas a janela de reprodução está oculta.
      // Se você deseja exibir a janela em algum momento, você pode adicionar código aqui para mostrar a janela.
      
      // Controle de volume (0 a 100)
      player.setVolume(100); // Define o volume para 50% (você pode ajustar o valor)
      
      // Inicie a reprodução automaticamente
      event.target.playVideo();
      
      // Adicionar funcionalidade aos botões e controle de volume
      var playButton = document.getElementById('playButton');
      var pauseButton = document.getElementById('pauseButton');
      var volumeSlider = document.getElementById('volumeSlider');
      
      playButton.addEventListener('click', function() {
          player.playVideo();
      });
      
      pauseButton.addEventListener('click', function() {
          player.pauseVideo();
      });
      
      volumeSlider.addEventListener('input', function() {
          var volume = volumeSlider.value;
          player.setVolume(volume);
      });
  }

  function onPlayerStateChange(event) {
      // Aqui você pode lidar com as mudanças de estado do player, como pausa ou reprodução.
      // event.data contém o estado atual do player (0 = encerrado, 1 = reproduzindo, 2 = pausado, 3 = bufferizando, 5 = vídeo de cued).
      
      // Exemplo de pausa e play programático
      if (event.data === YT.PlayerState.PAUSED) {
          // Você pode adicionar código aqui para reagir à pausa do vídeo
      } else if (event.data === YT.PlayerState.PLAYING) {
          // Você pode adicionar código aqui para reagir à reprodução do vídeo
      }
  }