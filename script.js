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
    const triesLabel = document.getElementById("triesLabel");

    let totalTries = 0;

    let revealed = new Array(buttons.length);

    for (let i = 0; i < revealed.length; i++)
    {
        revealed[i] = false;
    }

    let lastThree = [null, null, null];
    let tries = 0;
    let inTimeout = false;
    buttons.forEach(AddClickListener);

    const groupColors = CreateGroupColors();
    let groupAmount = new Array(buttons.length / 3);
    let buttonsGroup = new Array(buttons.length);

    //For states
    const states = ["0", "1", "*"];
    let groupsCurrentState = new Array(buttons.length / 3);
    let buttonsState = new Array(buttons.length);

    CreateGroupsArray(groupAmount, buttonsGroup);
    AssignGroupsToButtons(groupAmount, buttonsGroup);
    AssignStatesToButtons();

    function SetTextOfButton(text, button)
    {
        button.textContent = text;
    }

    function AssignStatesToButtons()
    {
        for (let i = 0; i < buttons.length; i++)
        {
            let group = buttonsGroup[i];
            let groupCurrentState = groupsCurrentState[group];
            console.log(groupCurrentState);
            buttonsState[i] = states[groupCurrentState];
            groupsCurrentState[group]++;
        }
    }

    function TurnAllButtonsBlack()
    {
        for (let i = 0; i < buttons.length; i++)
        {
            var index = GetIndexFromItem(buttons[i], buttons);

            if (revealed[index] === false)
            {
                SetTextOfButton("", buttons[i])
                buttons[i].style.backgroundColor = "rgb(40, 40, 43)";
            }
        }
        inTimeout = false;
    }

    function IsButtonInLastTries(button)
    {
        for (let i = 0; i < lastThree.length; i++)
        {
            if (button === lastThree[i])
            {
                return true;
            }
        }

        return false;
    }
    
    function AddTry(button)
    {
        lastThree[tries] = button;
        tries++;
        totalTries++
        triesLabel.textContent = "Tries: " + totalTries;
        console.log("Added try: " + tries);
        if (tries >= 3)
        {
            if (GetGroupFromButton(lastThree[0]) === GetGroupFromButton(lastThree[1]) && GetGroupFromButton(lastThree[2]) === GetGroupFromButton(lastThree[0]))
            {
                var firstButton = lastThree[0];
                var secondButton = lastThree[1];
                var thirdButton = lastThree[2];

                console.log("Good");

                revealed[GetIndexFromItem(firstButton, buttons)] = true;
                revealed[GetIndexFromItem(secondButton, buttons)] = true;
                revealed[GetIndexFromItem(thirdButton, buttons)] = true;
            }
            else
            {
                inTimeout = true;
                setTimeout(TurnAllButtonsBlack, 1500);
            }
            
            lastThree[0] = null;
            lastThree[1] = null;
            lastThree[2] = null;
            tries = 0;
        }
    }

    function AddClickListener(button)
    {
        button.addEventListener("click", HandleClick);
    }

    function HandleClick(e)
    {
        const button = e.currentTarget;
        var index = GetIndexFromItem(button, buttons);

        if (inTimeout === true || revealed[index] === true || IsButtonInLastTries(button) === true)
        {
            return null;
        }

        
        var group = buttonsGroup[index];
        var color = groupColors[group];
        console.log(buttonsState);
        SetTextOfButton(buttonsState[index], button);
        button.style.backgroundColor = "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
        AddTry(button);
    }

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
        {
            groupAmount[i] = 0;
        }

        for (let i = 0; i < groupsCurrentState.length; i++)
        {
            groupsCurrentState[i] = 0;
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

    function GetGroupFromButton(button)
    {

        let index = GetIndexFromItem(button, buttons);
        console.log(index);
        return buttonsGroup[index];
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