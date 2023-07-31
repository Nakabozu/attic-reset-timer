<script lang="ts">
    import { onMount } from "svelte";
    import { io } from "socket.io-client";
    import moment from "moment";

    const socket = io("ws://localhost:5174/");

    const secondsToString = (seconds: number) => {
        if(seconds/10 < 1){
            return `0${seconds}`;
        }else{
            return seconds;
        }
    }

    $: isMuted = false;
    let thisAudio: HTMLAudioElement;
    let sound = "Several Dings.mp3";
    let wantsNotifications = false;
    let nextUpdateDate = moment();
    let timeToNextUpdate = 420-(Math.abs(nextUpdateDate.diff(moment(), "s")) % 420);
    let minutesToNextUpdate = Math.floor(timeToNextUpdate / 60);
    let secondsToNextUpdate = secondsToString(timeToNextUpdate % 60);

    // STARTUP THE CLOCK
    onMount(() => {
		const interval = setInterval(() => {
			timeToNextUpdate = 420-(Math.abs(nextUpdateDate.diff(moment(), "s")) % 420);
            minutesToNextUpdate = Math.floor(timeToNextUpdate / 60);
            secondsToNextUpdate = secondsToString(timeToNextUpdate % 60);

            if(timeToNextUpdate <= 1){
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
		}, 500);

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

<div class="banner-container">
    <h1>Almost Abandoned Attic Restock Timer</h1>
</div>
<h2>{minutesToNextUpdate}:{secondsToNextUpdate}</h2>
    <h3>
        <button class="transparent-button" on:click={()=>{wantsNotifications = !wantsNotifications}}>
            <img
                src="icons8-notification.svg"
                alt={wantsNotifications ? "Notifications on" : "Notifications off"} 
                class={`${wantsNotifications ? "black-to-white" : "black-to-red"}`}/>
        </button>
    </h3>
        <div class="buttons-container">
            <button class="time-adjust-button" on:click={()=>{adjust_timer(-1, "minute")}}>⏪ Subtract Minute</button>
            <button class="time-adjust-button" on:click={()=>{adjust_timer(-1, "second")}}>⏴ Subtract Second</button>
            <button class="time-adjust-button" on:click={reset_timer}>⟳ Reset Timer</button>
            <button class="time-adjust-button" on:click={()=>{adjust_timer(1, "second")}}>⏵ Add Second</button>
            <button class="time-adjust-button" on:click={()=>{adjust_timer(1, "minute")}}>⏩ Add Minute</button>
        </div>

        <div class="audio-container">
            <input
                type="image"
                src={isMuted ? "icons8-no-audio-24.png" : "icons8-audio-64.png"}
                alt={isMuted ? "Audio is muted" : "Audio is active"}
                width="64px"
                on:click={()=>{isMuted = !isMuted}}/>
            <audio
                class="audio-controls"
                controls
                src={sound}
                bind:muted={isMuted}
                bind:this={thisAudio}/>
            <div class="audio-buttons-container">
                <button class="audio-button" on:click={()=>{changeAudio("Several Dings.mp3")}}>Several Dings</button>
                <button class="audio-button" on:click={()=>{changeAudio("Toaster Ding.mp3")}}>Toaster Ding</button>
                <button class="audio-button" on:click={()=>{changeAudio("Car Door Open chime.mp3")}}>Car Door Is Open Chime</button>
                <button class="audio-button" on:click={()=>{changeAudio("Twinkle Toes.mp3")}}>Twinkle Toes</button>
                <button class="audio-button" on:click={()=>{changeAudio("Typewriter.mp3")}}>Typewriter on the fritz</button>
                <button class="audio-button" on:click={()=>{changeAudio("Double D Ehem.mp3")}}>Ehem</button>
                <button class="audio-button" on:click={()=>{changeAudio("Ed, Edd, n Eddy Intro.mp3")}}>Ed, Edd, n Eddy Title Card</button>
                <button class="audio-button" on:click={()=>{changeAudio("La cucaracha.mp3")}}>La Cucaracha Car Horn</button>
                <button class="audio-button" on:click={()=>{changeAudio("Yelling Man why he so mad.mp3")}}>Angry Man</button>
                <button class="audio-button" on:click={()=>{changeAudio("Eddy says Get It On.mp3")}}>Get It On</button>
                <button class="audio-button" on:click={()=>{changeAudio("Yodel.mp3")}}>Yodel</button>
            </div>
        </div>
<section>Visit <a href="https://www.sunnyneo.com/attictimer/"> sunnyneo </a> for details about the almost abandoned attic.</section>
<style>
    :global(body){
        margin:0px;
        padding: 0px;
        min-height: 100vh;

        color: white;

        background: rgb(13,10,39);
        background: linear-gradient(45deg, rgba(13,10,39,1) 0%, rgba(44,24,93,1) 35%, rgba(83,140,167,1) 100%); 
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
    
    h2{
        width: 100%;
        text-align: center;

        font-family: 'Courier New', Courier, monospace;
        font-size: 4em;
        font-weight: 600;

        text-shadow: #000000 -7px 5px 6px;
    }

    h3{
        display: flex;
        flex-flow: row 1;
        align-items: center;
        justify-content: center;
    }

    .black-to-red{
        filter: invert(12%) sepia(99%) saturate(7050%) hue-rotate(347deg) brightness(98%) contrast(97%);
    }

    .black-to-white{
        filter: invert(100%);
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

    .audio-button{
        
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

    section{
        position: relative;
        bottom: 0px;
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        justify-content: center;
    }
</style>