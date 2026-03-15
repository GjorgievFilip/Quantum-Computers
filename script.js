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

    function GetUnassignedButtons(assignedButtons)
    {
        console.log('Execute');
        let unassignedButtons = [];

        for (let i = 0; i < buttons.length; i++)
        {
            let inAssignedArray = false;

            for (let j = 0; j < assignedButtons.length; j++)
            {
                if (assignedButtons[j] === buttons[i])
                {
                    inAssignedArray = true;
                }
            }

            if (inAssignedArray === false)
            {
                unassignedButtons.push(buttons[i]);
            }
        }

        return unassignedButtons;
    }

    function CreateGroupColors()
    {
        const upperColorLimit = 195;
        const lowerColorLimit = 55;
        const amountOfGroups = buttons.length / 3;
        let groupColors = new Array(amountOfGroups);

        for (let i = 0; i < amountOfGroups; i++)
        {
            groupColors[i] = Math.random() * (upperColorLimit - lowerColorLimit) + lowerColorLimit;
        }

        return groupColors;
    }

   

    
    const groupColors = CreateGroupColors();
    let assignedButtons = [];
    
    console.log(groupColors);

    for (let i = 0; i < buttons.length; i++)
    {
        let unassignedButtons = GetUnassignedButtons(assignedButtons);
        
        let unassignedButton = unassignedButtons[Math.floor(Math.random() * unassignedButtons.length)]
        assignedButtons.push(unassignedButton);
        unassignedButton.style.backgroundColor = "lightBlue";
    }
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