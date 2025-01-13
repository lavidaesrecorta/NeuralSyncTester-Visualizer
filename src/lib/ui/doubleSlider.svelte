<!-- Original Design by https://medium.com/@predragdavidovic10 -->
<script>

    export let minValue = 0
    export let maxValue = 100
    export let step = 1

    export let sliderRightValue = 90
    export let sliderLeftValue = 10



    const onMinSliderInput = () => {
        if (sliderLeftValue > sliderRightValue) {
            sliderLeftValue = sliderRightValue
        }
    }

    const onMaxSliderInput = () => {
        if (sliderRightValue < sliderLeftValue) {
            sliderRightValue = sliderLeftValue
        }
    }

</script>

<div class="range_container">
    <div class="sliders_control">
        <input id="fromSlider" type="range" bind:value={sliderLeftValue} on:input={() => onMinSliderInput()} step={step}  min={minValue} max={maxValue}/>
        <input id="toSlider" type="range" bind:value={sliderRightValue} on:input={() => onMaxSliderInput()} step={step} min={minValue} max={maxValue}/>
    </div>
    <div class="form_control">
        <div class="form_control_container">
            <div class="form_control_container__time">Min</div>
            <input class="form_control_container__time__input" type="number" id="fromInput" on:change={()=>{onMinSliderInput()}} bind:value={sliderLeftValue} step={step} min={minValue} max={maxValue}/>
        </div>
        <div class="form_control_container">
            <div class="form_control_container__time">Max</div>
            <input class="form_control_container__time__input" type="number" id="toInput" on:change={()=>{onMaxSliderInput()}} bind:value={sliderRightValue} step={step}  min={minValue} max={maxValue}/>
        </div>
    </div>
</div>


<style>
    .range_container {
        padding: 40px 0;
}

.sliders_control {
  position: relative;
  min-height: 50px;
}

.form_control {
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  color: #635a5a;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #C6C6C6;
  cursor: pointer;
}

input[type=range]::-moz-range-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #C6C6C6;
  cursor: pointer;  
}

input[type=range]::-webkit-slider-thumb:hover {
  background: #f7f7f7;
}

input[type=range]::-webkit-slider-thumb:active {
  box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
  -webkit-box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
}

input[type="number"] {
  color: #8a8383;
  width: 70px;
  height: 30px;
  font-size: 20px;
  border: none;
}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button {  
   opacity: 1;
}

input[type="range"] {
  -webkit-appearance: none; 
  appearance: none;
  height: 2px;
  width: 100%;
  position: absolute;
  background-color: #C6C6C6;
  pointer-events: none;
}

#fromSlider {
  height: 0;
  z-index: 1;
}
</style>