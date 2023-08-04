<script lang="ts">
    import { onMount } from "svelte";
    import { io } from "socket.io-client";
    import moment from "moment";

    const socket = io("wss://134.209.222.229/");

    const secondsToString = (seconds: number) => {
        if(seconds/10 < 1){
            return `0${seconds}`;
        }else{
            return seconds;
        }
    }

    const audioFileList = [
        {title: "Dings and Rattles", audio: "Several Dings.mp3"},
        {title: "Toaster Ding", audio: "Toaster Ding.mp3"},
        {title: "Car Door Is Open Chime", audio: "Car Door Open chime.mp3"},
        {title: "Twinkle Toes", audio: "Twinkle Toes.mp3"},
        {title: "Typewriter on the fritz", audio: "Typewriter.mp3"},
        {title: "Ehem", audio: "Double D Ehem.mp3"},
        {title: "Ed, Edd, n Eddy Title Card", audio: "Ed, Edd, n Eddy Intro.mp3"},
        {title: "La Cucaracha Car Horn", audio: "La cucaracha.mp3"},
        {title: "Get It On", audio: "Eddy says Get It On.mp3"},
        {title: "Angry Man", audio: "Yelling Man why he so mad.mp3"},
        {title: "Yodel", audio: "Yodel.mp3"}
    ];

    $: isMuted = false;
    let totalSecondsToCountdown = 420;
    let timeToTriggerAlertAt = 1;
    let thisAudio: HTMLAudioElement;
    let sound = audioFileList[0].audio;
    let wantsNotifications = false;
    let nextUpdateDate = moment();
    let timeToNextUpdate = totalSecondsToCountdown-(Math.abs(nextUpdateDate.diff(moment(), "s")) % totalSecondsToCountdown);
    let minutesToNextUpdate = Math.floor(timeToNextUpdate / 60);
    let secondsToNextUpdate = secondsToString(timeToNextUpdate % 60);

    // STARTUP THE CLOCK
    onMount(() => {
		const interval = setInterval(() => {
			timeToNextUpdate = totalSecondsToCountdown-(Math.abs(nextUpdateDate.diff(moment(), "s")) % totalSecondsToCountdown);
            minutesToNextUpdate = Math.floor(timeToNextUpdate / 60);
            secondsToNextUpdate = secondsToString(timeToNextUpdate % 60);

            if(timeToNextUpdate === timeToTriggerAlertAt){
                thisAudio.play();
                if(wantsNotifications){
                    Notification.requestPermission().then(perm => {
                        if(perm === 'granted') {
                            new Notification("NEOPETS HEADS UP!", {
                                body: 'The Almost Abandoned Attic will restock soon!',
                                icon: 'AtticDweller.png'
                            })
                        }
                    });
                }
            }
		}, 999);

		return () => {
			clearInterval(interval);
		};
	});

    const changeAudio = (newAudio: string) => {
        sound = newAudio;
    }

    /* *********************************** *
    * WHERE ALL OF THE SWEET WEBHOOKS LIVE *
    * ************************************ */
    // MESSAGES I EMIT
    const reset_timer = () => {
        nextUpdateDate = moment();
        socket.emit("reset_timer");
    };

    const adjust_timer = (amount: number, unit: "minute" | "second") => {
        nextUpdateDate.add(amount, unit);
        socket.emit("adjust_timer", amount, unit);
    }

    // MESSAGES I RECEIVE
    socket.on("welcomeEventFromServer", (date) => {
        nextUpdateDate = moment(date);
    });
    
    socket.on("timer_updated", (date) =>{
        nextUpdateDate = moment(date);
    });
    /* ************************ *
    * END OF THE SWEET WEBHOOKS *
    * ************************* */
    
</script>

<header class="banner-container">
    <h1>Almost Abandoned Attic Restock Timer</h1>
</header>

<h3>
    <div class="img-button-container">
        <input
            id="push-input"
            type="image"
            src="icons8-notification.svg"
            alt={wantsNotifications ? "Notifications on" : "Notifications off"} 
            class={`${wantsNotifications ? "black-to-white" : "black-to-red"}`}
            on:click={()=>{wantsNotifications = !wantsNotifications}}/>
        <label for="push-input">{wantsNotifications ? "Push Notifications On" : "Push Notifications Off"}</label>
    </div>
    <div class="img-button-container">
        <input
            id="mute-input"
            type="image"
            src={isMuted ? "icons8-no-audio-24.png" : "icons8-audio-64.png"}
            alt={isMuted ? "Audio is muted" : "Audio is active"}
            width="64px"
            on:click={()=>{isMuted = !isMuted}}/>
        <label for="mute-input">{isMuted ? "Audio is muted" : "Audio is active"}</label>
    </div>
</h3>

<div class="timer-container">
    <h2>{minutesToNextUpdate}:{secondsToNextUpdate}</h2>
    <label for="seconds-between-alerts">Time to Trigger Alert At: </label>
    <input id="seconds-between-alerts" type="number" inputmode="numeric" bind:value={timeToTriggerAlertAt} max={totalSecondsToCountdown} min={1}/>
    <label for="seconds-between-alerts">Seconds between alerts: </label>
    <input id="seconds-between-alerts" type="number" inputmode="numeric" bind:value={totalSecondsToCountdown} min={1}/>
</div>

<div class="buttons-container">
    <button class="time-adjust-button" on:click={()=>{adjust_timer(-1, "minute")}}>⏪ Subtract Minute</button>
    <button class="time-adjust-button" on:click={()=>{adjust_timer(-1, "second")}}>⏴ Subtract Second</button>
    <button class="time-adjust-button" on:click={reset_timer}>⟳ Reset Timer</button>
    <button class="time-adjust-button" on:click={()=>{adjust_timer(1, "second")}}>⏵ Add Second</button>
    <button class="time-adjust-button" on:click={()=>{adjust_timer(1, "minute")}}>⏩ Add Minute</button>
</div>

    <div class="audio-container">
        <audio
            class="audio-controls"
            controls
            src={sound}
            bind:muted={isMuted}
            bind:this={thisAudio}/>
        <select id="sound-options" name="sound-options" bind:value={sound}>
            {#each audioFileList as soundOption}
                <option value={soundOption.audio}>{soundOption.title}</option>
            {/each}
        </select> 
    </div>
    <footer>
        <p>You can find the almost abandoned attic <a href="https://www.neopets.com/halloween/garage.phtml">here</a>.</p>
        <p>Visit <a href="https://www.sunnyneo.com/attictimer/">sunnyneo</a> for details about the almost abandoned attic.</p>
    </footer>

<style>
    :global(body){
        margin:0px;
        padding: 0px;
        min-height: 100vh;

        color: white;

        background: rgb(13,10,39);
        background: linear-gradient(45deg, rgba(13,10,39,1) 0%, rgba(44,24,93,1) 35%, rgba(83,140,167,1) 100%); 
    }

    p{
        white-space: pre-wrap;
    }

    a{
        white-space: pre-wrap;
        color: #AACCFF;
    }

    a:visited{
        color: #6699FF;
    }

    .banner-container{
        background: #000000 url("ghost_shop.gif") no-repeat center;
        background-size: cover;

        padding: 1em; 
    }

    h1{
        display: flex;
        flex-flow: row;
        flex-grow: 1;
        align-items: center;
        justify-content: center;

        margin: 0px;
        padding: 0px;
        z-index: 2;

        font: 600 3em Helvetica, Arial, Sans-Serif;
        color: white;
        text-shadow: #000000 -7px -1px 4px;
        -webkit-text-stroke: 2px black; /* width and color */
    }
    
    .timer-container{
        text-align: center;
        margin-bottom: 2em;
    }

    .timer-container input:not(:last-child){
        margin-right: 10px;
    }

    /* The timer itself */
    h2{
        width: 100%;
        text-align: center;

        font-family: 'Courier New', Courier, monospace;
        font-size: 4em;
        font-weight: 600;

        text-shadow: #000000 -7px 5px 6px;
        padding: 0px;
        margin: 0px;
    }

    /* contains the push notifications and mute buttons*/
    h3{
        display: flex;
        flex-flow: row 1;
        align-items: center;
        justify-content: flex-end;
    }

    .black-to-red{
        filter: invert(12%) sepia(99%) saturate(7050%) hue-rotate(347deg) brightness(98%) contrast(97%);
    }

    .black-to-white{
        filter: invert(100%);
    }

    .img-button-container{
        display: flex;
        flex-direction: column;
        width: 64px;
        margin-right: 1em;
    }

    .img-button-container label{
        margin-top: 1em;
        text-align: center;
        font-size: 0.5em;
    }

    .buttons-container{
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        justify-content: space-evenly;
    }

    .audio-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .audio-controls{
        min-width: "300px";
        width: 50%;
        padding: 1em 0em;
    }

    .transparent-button{
        border: none;
        background: none;
    }

    button{
        cursor: pointer;
    }

    :global(html:active){
        cursor: url("https://uxwing.com/wp-content/themes/uxwing/download/computers-mobile-hardware/mouse-click-icon.png");
    }

    .time-adjust-button{
        background: #E9FFF3;
        width: 10em;
        padding: 5px 0px;
        margin-bottom: 1em;
        color: #F60730;
        border: linear-gradient(45deg, rgba(13,10,39,1) 0%, rgba(44,24,93,1) 35%, rgba(83,140,167,1) 100%) solid 3px;
        border-radius: 8px;

        line-height: 1.5em;
        vertical-align: middle;

        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 1.5em;
        font-weight: 500;
    }

    .time-adjust-button:active{
        background: linear-gradient(225deg, #E9FFF3 0%, #96a89f 100%);
        color: #D50020;
    }

    footer{
        width: 100%;
        position: absolute;
        bottom: 0px;
    }

    footer p{
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin: 0px;
        padding-bottom: 10px;
    }
</style>