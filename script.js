//Constants
const path = window.location.pathname;

//Pages

function IndexPage()
{
    console.log("Index Page");
}

function ApplicationsPage()
{
    console.log("Applications Page");
}

function PowerPage()
{
    console.log("Power Page");
}

function SecurityPage()
{
    console.log("Security Page");
}

function ArtificalIntelligencePage()
{
    console.log("Artificial Intelligence Page");
}

function ModelsPage()
{
    console.log("Models Page");
}

function GalleryPage()
{
    console.log("Gallery Page");
}

function MemoryPage()
{
    console.log("Memory Page")

    const memoryGame = document.getElementById("memoryGame");
    const buttons = memoryGame.querySelectorAll(".qubitGroup");

    console.log(buttons.length);
}
//Pages

if (path.endsWith("index.html"))
{
    IndexPage();
}

if (path.endsWith("applications.html"))
{
    ApplicationsPage();
}

if (path.endsWith("power.html"))
{
    PowerPage();
}

if (path.endsWith("security.html"))
{
    SecurityPage();
}

if (path.endsWith("ai.html"))
{
    ArtificalIntelligencePage();
}

if (path.endsWith("models.html"))
{
    ModelsPage();
}

if (path.endsWith("gallery.html"))
{
    GalleryPage();
}

if (path.endsWith("memory.html"))
{
    MemoryPage();
}