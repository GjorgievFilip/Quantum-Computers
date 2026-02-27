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
//Pages

if (path.endsWith("index.html"))
{
    IndexPage();
}

if (path.endsWith("applications.html"))
{
    IndexPage();
}

if (path.endsWith("power.html"))
{
    IndexPage();
}

if (path.endsWith("security.html"))
{
    IndexPage();
}

if (path.endsWith("ai.html"))
{
    IndexPage();
}

if (path.endsWith("models.html"))
{
    IndexPage();
}

if (path.endsWith("gallery.html"))
{
    IndexPage();
}