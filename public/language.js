// No arquivo language.js
const titleElement = document.getElementById('title');
const textElement = document.getElementById('text');
const languageButton = document.getElementById('languageButton');

let currentLanguage = 'portuguese';

const texts = [
  {
    portuguese: "Olá, sou Israel Feitosa, um entusiasta do desenvolvimento de software. Desde 2019, venho me dedicando ao mundo da programação, buscando constantemente aprimorar minhas habilidades e conhecimentos nessa área em constante evolução.",
    english: "Hello, I'm Israel Feitosa, a software development enthusiast. Since 2019, I have been dedicated to the world of programming, constantly seeking to improve my skills and knowledge in this ever-evolving field."
  },
  {
    portuguese: "Minha trajetória começou quando enxerguei a oportunidade de expandir meus horizontes durante a pandemia e decidi mergulhar no universo da programação. Impulsionado por minha curiosidade insaciável e desejo de aprendizado, embarquei nessa jornada desafiadora e repleta de possibilidades.",
    english: "My journey began when I saw the opportunity to expand my horizons during the pandemic and decided to dive into the world of programming. Driven by my insatiable curiosity and desire for learning, I embarked on this challenging journey filled with possibilities."
  },
  {
    portuguese: "Atualmente, atuo como desenvolvedor de software científico, com foco principal em aplicações web e no desenvolvimento do software FLOCO® (Field Layout Concept Optimizer). Essa ferramenta inovadora desempenha um papel crucial na indústria de energia, automatizando a geração de conceitos de sistemas offshore para a produção de óleo e gás. Sinto-me extremamente satisfeito em poder contribuir para o desenvolvimento de soluções criativas e eficientes para problemas complexos.",
    english: "Currently, I work as a scientific software developer, with a primary focus on web applications and the development of the FLOCO® (Field Layout Concept Optimizer) software. This innovative tool plays a crucial role in the energy industry, automating the generation of offshore system concepts for oil and gas production. I am extremely pleased to contribute to the development of creative and efficient solutions for complex problems."
  },
  {
    portuguese: "Minha experiência prévia na área de Arquitetura e Construção Civil tem sido valiosa, pois trouxe habilidades analíticas e de resolução de problemas que se mostraram fundamentais no desenvolvimento de softwares científicos.",
    english: "My previous experience in the field of Architecture and Civil Construction has been valuable, as it has brought analytical and problem-solving skills that have proven crucial in the development of scientific software."
  },
  {
    portuguese: "Sinto-me orgulhoso de minha dedicação em aprender e me adaptar a novas tecnologias e desafios da programação. Acredito que essa mentalidade aberta e ávida por conhecimento continuará a impulsionar meu sucesso profissional no futuro.",
    english: "I am proud of my dedication to learning and adapting to new technologies and programming challenges. I believe that this open-minded and eager-to-learn mindset will continue to drive my professional success in the future."
  },
  {
    portuguese: "Estou entusiasmado em explorar novos projetos e oportunidades que me permitam crescer ainda mais nesse campo. A busca pela excelência e a paixão por soluções inovadoras são os pilares que norteiam meu caminho, e estou ansioso para enfrentar novos desafios que me permitam fazer a diferença no mundo do desenvolvimento de software.",
    english: "I am excited to explore new projects and opportunities that allow me to further grow in this field. The pursuit of excellence and a passion for innovative solutions are the pillars that guide my path, and I look forward to facing new challenges that allow me to make a difference in the world of software development."
  }
];

let currentIndex = 0;
const slideTextElement = document.getElementById("slideText");
const prevArrow = document.querySelector(".prev-arrow");
const nextArrow = document.querySelector(".next-arrow");

function updateSlideText() {
  const languageTexts = texts[currentIndex];
  slideTextElement.textContent = currentLanguage === 'portuguese' ? languageTexts.portuguese : languageTexts.english;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % texts.length;
  updateSlideText();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + texts.length) % texts.length;
  updateSlideText();
}

function startSlideShow() {
  updateSlideText();
  setInterval(nextSlide, 15000); // Altera o slide a cada 10 segundos (10000 milissegundos)
}

prevArrow.addEventListener("click", prevSlide);
nextArrow.addEventListener("click", nextSlide);

startSlideShow();



function updateTexts() {
  updateSlideText();
}

languageButton.addEventListener('click', function () {
  currentLanguage = currentLanguage === 'portuguese' ? 'english' : 'portuguese';
  updateTexts();
});

// Atualizar o texto ao carregar a página
updateTexts();


// Função para criar o sidebar no topo
function createLanguageSidebar() {
  const topSidebar = document.createElement("div");
  topSidebar.setAttribute("id", "topSidebar");

  const languages = [
    { name: "C++", iconClass: "fab fa-cuttlefish" },
    { name: "NodeJs", iconClass: "fab fa-node-js" },
    { name: "Python", iconClass: "fab fa-python" },
    { name: "React", iconClass: "fab fa-react" },
  ];

  languages.forEach((language) => {
    const link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("class", "sidebar-link");

    const icon = document.createElement("i");
    icon.setAttribute("class", `sidebar-icon ${language.iconClass}`); // Adiciona a classe para o ícone

    link.appendChild(icon);
    topSidebar.appendChild(link.cloneNode(true));
  });

  document.body.appendChild(topSidebar);
}

createLanguageSidebar();


    // Obter referência ao elemento de áudio
    const audio = document.getElementById('backgroundAudio');

    // Função para reproduzir a música ao interagir com a página
    function playAudio() {
      audio.play();
      // Remova o evento após a reprodução para evitar múltiplas reproduções
      document.removeEventListener('click', playAudio);
    }

    // Adicione um evento de clique na página para iniciar a reprodução de áudio
    document.addEventListener('click', playAudio);