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

    function CreateGroupColors()
    {
        const upperColorLimit = 255;
        const lowerColorLimit = 5;
        const amountOfGroups = buttons.length / 3;
        let groupColors = new Array(amountOfGroups);

        for (let i = 0; i < amountOfGroups; i++)
        {
            groupColors[i] = [0, 0, 0];

            for (let j = 0; j < groupColors.length; j++)
            {
                groupColors[i][j] = Math.random() * (upperColorLimit - lowerColorLimit) + lowerColorLimit;
            }
        }

        return groupColors;
    }

    function CreateGroupsArray(groupAmount, buttonsGroup)
    {

        for (let i = 0; i < buttonsGroup.length; i++)
        {
            buttonsGroup[i] = -1;
        }

        for (let i = 0; i < groupAmount.length; i++)
        {;
            groupAmount[i] = 0;
        }

    }

    function GetAllUnassignedButtons(buttonsGroup)
    {
        let unassignedButtonArray = new Array();

        for (let i = 0; i < buttons.length; i++)
        {
            if (buttonsGroup[i] === -1)
            {
                unassignedButtonArray.push(buttons[i]);
            }
        }

        return unassignedButtonArray;
    }

    function GetIndexFromItem(item, array)
    {
        for (let i = 0; i < array.length; i++)
        {
            if (array[i] == item)
            {
                return i;
            }
        }

        return -1;
    }

    function GetRandomUnassignedButton(buttonsGroup)
    {
        let unassignedButtons = GetAllUnassignedButtons(buttonsGroup);
        var button = unassignedButtons[Math.floor(Math.random() * unassignedButtons.length)];

        return button;
    }

    function AssignGroupsToButtons(groupAmount, buttonsGroup)
    {
        for (let group = 0; group < groupAmount.length; group++)
        {
            console.log(groupAmount);
            while (groupAmount[group] < 3)
            {
                //Get a random button
                var button = GetRandomUnassignedButton(buttonsGroup);
                let index = GetIndexFromItem(button, buttons);
                buttonsGroup[index] = group;

                groupAmount[group]++;
                console.log('Assigned Button Number ' + index + ' to group ' + group + '. Group Amount now: ' + groupAmount[group]);
            }
        }
    }

    const groupColors = CreateGroupColors();
    let groupAmount = new Array(buttons.length / 3);
    let buttonsGroup = new Array(buttons.length);

    CreateGroupsArray(groupAmount, buttonsGroup);
    AssignGroupsToButtons(groupAmount, buttonsGroup);

    console.log(buttonsGroup);
    for (let i = 0; i < buttons.length; i++)
    {
        let group = buttonsGroup[i];
        let color = groupColors[group];
        buttons[i].style.backgroundColor = "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
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