// ========================================
// DARK MODE
// ========================================

const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){

    document.body.classList.add("dark");
    themeToggle.innerHTML = "☀️";

}else{

    themeToggle.innerHTML = "🌙";

}

themeToggle.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");
        themeToggle.innerHTML = "☀️";

    }else{

        localStorage.setItem("theme","light");
        themeToggle.innerHTML = "🌙";

    }

});


// ========================================
// GITHUB PROJECTS
// ========================================

const githubContainer =
document.getElementById("github-projects");

githubContainer.innerHTML = `
<div class="repo-card">
    <h3>Loading Projects...</h3>
    <p>Please wait a moment.</p>
</div>
`;

fetch("https://api.github.com/users/ayunalarati/repos")

.then(response => response.json())

.then(repos => {

    githubContainer.innerHTML = "";

    repos

    .sort((a,b)=>{

        return b.updated_at.localeCompare(a.updated_at);

    })

    .slice(0,6)

    .forEach(repo=>{

        const card = document.createElement("div");

        card.classList.add("repo-card");

        card.innerHTML = `

        <h3>${repo.name}</h3>

        <p>
        ${repo.description || "No description available yet."}
        </p>

        <a href="${repo.html_url}"
           target="_blank">

           View Repository →

        </a>

        `;

        githubContainer.appendChild(card);

    });

})

.catch(error=>{

    githubContainer.innerHTML = `

    <div class="repo-card">

        <h3>Oops 😢</h3>

        <p>
        Failed to load GitHub repositories.
        </p>

    </div>

    `;

    console.log(error);

});


// ========================================
// SCROLL REVEAL
// ========================================

const hiddenElements =
document.querySelectorAll("section");

const observer = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},

{
    threshold:0.15
}

);

hiddenElements.forEach(section=>{

    section.classList.add("hidden");

    observer.observe(section);

});


// ========================================
// ACTIVE NAVBAR
// ========================================

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop =
        section.offsetTop - 150;

        const sectionHeight =
        section.clientHeight;

        if(pageYOffset >= sectionTop){

            current =
            section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(

            link.getAttribute("href")
            ===
            `#${current}`

        ){

            link.classList.add("active");

        }

    });

});


// ========================================
// SMOOTH SCROLL
// ========================================

document
.querySelectorAll('a[href^="#"]')

.forEach(anchor=>{

    anchor.addEventListener("click",

    function(e){

        e.preventDefault();

        const target =
        document.querySelector(
            this.getAttribute("href")
        );

        target.scrollIntoView({

            behavior:"smooth"

        });

    });

});


// ========================================
// HERO TYPING EFFECT
// ========================================

const heroTitle =
document.querySelector(".hero h2");

const originalText =
heroTitle.innerHTML;

window.addEventListener("load",()=>{

    heroTitle.style.opacity = "0";

    setTimeout(()=>{

        heroTitle.style.opacity = "1";

    },300);

});


// ========================================
// CONSOLE SIGNATURE 😎
// ========================================

console.log(
"%cDesigned & Built by Ayu Nalarati 🚀",
"color:#A4DD00;font-size:18px;font-weight:bold;"
);