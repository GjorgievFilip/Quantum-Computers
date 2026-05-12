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
    //Constants
    const states = ["0", "1", "( )"];
    const memoryGame = document.getElementById("memoryGame");
    const buttons = memoryGame.querySelectorAll(".qubitGroup");
    const triesLabel = document.getElementById("triesLabel");
    const groupColors = CreateGroupColors();
    const minimumColorDistance = 20;

    //Variables
    let totalTries; //Counts the amount of tries in a game
    let revealed; //A matrix that shows which qubits have already been revealed
    let lastThree; //Array that holds the last 3 buttons that have been clicked
    let tries; //Counts the amount of tries before the last three qubits get evaluated (3)
    let inTimeout; //Boolean that defines if the game is in a timeout
    let groupAmount; //Array that counts how many qubits each group already has
    let buttonsGroup; //Array that defines to which group each button belongs
    let groupsCurrentState; //Array used at the start to define which state is next in the group
    let buttonsState; //Array that lets you know which state each button has
    let gameCount = 0;
    
    document.getElementById("resetGameButton").addEventListener("click", StartGame);
    StartGame();

    function StartGame()
    {
        gameCount++;
        totalTries = 0;
        lastThree = [null, null, null];
        tries = 0;
        inTimeout = false;
        revealed = new Array(buttons.length);
        groupAmount = new Array(buttons.length / 3)
        buttonsGroup = new Array(buttons.length);
        groupsCurrentState = new Array(buttons.length / 3)
        buttonsState = new Array(buttons.length);

        for (let i = 0; i < revealed.length; i++)
        {
            revealed[i] = false;
        }

        triesLabel.textContent = "Tries: 0"
        buttons.forEach(AddClickListener); 
        CreateGroupsArray(groupAmount, buttonsGroup);
        AssignGroupsToButtons(groupAmount, buttonsGroup);
        AssignStatesToButtons();
        TurnAllButtonsBlack();
    }

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

    function GroupColorHasContrastToOthers(i, groupColorsArray)
    {
        const targetGroupColor = groupColorsArray[i];

        for (let iteration = 0; iteration < groupColorsArray.length ; iteration++)
        {
            if (iteration != i && groupColorsArray[iteration] != null)
            {
                const redDistance = targetGroupColor[0] - groupColorsArray[iteration][0];
                const greenDistance = targetGroupColor[1] - groupColorsArray[iteration][1];
                const blueDistance = targetGroupColor[2] - groupColorsArray[iteration][2];

                const distance = (redDistance+greenDistance+blueDistance);
                
                if (Math.sqrt(redDistance*redDistance+greenDistance*greenDistance+blueDistance*blueDistance) < 40)
                {
                    return false;
                }
            }
        }

        return true;
    }

    function CreateGroupColors()
    {
        const upperColorLimit = 205;
        const lowerColorLimit = 5;
        const amountOfGroups = buttons.length / 3;
        let groupColors = new Array(amountOfGroups);
        let hasContrast = false;
        console.log(amountOfGroups);
        for (let i = 0; i < amountOfGroups; i++)
        {
            hasContrast = true;
            while (hasContrast)
            {
                groupColors[i] = [0, 0, 0];

                for (let j = 0; j < groupColors.length; j++)
                {
                    groupColors[i][j] = Math.random() * (upperColorLimit - lowerColorLimit) + lowerColorLimit;
                }

                console.log(groupColors[i]);
                hasContrast = !GroupColorHasContrastToOthers(i, groupColors);
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