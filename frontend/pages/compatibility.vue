<template>
    <div class="compatibility pages">
        <h1>Astrological Sign Compatibility</h1>
        <div class="separator"></div>
            <div>
                <label for="sign1">Your Sign:</label>
                <select v-model="sign1" id="sign1">
                    <option v-for="sign in signs" :key="sign" :value="sign">{{ sign }}</option>
                </select>
            </div>
        <div>
            <label for="sign2">Partner's Sign:</label>
            <select v-model="sign2" id="sign2">
                <option v-for="sign in signs" :key="sign" :value="sign">{{ sign }}</option>
            </select>
        </div>
        <div>
            <button @click="calculateCompatibility">Calculate Compatibility</button>
            </div>
        <div v-if="result !== null">
            <h2>Result: {{ result }}%</h2>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            signs: [
                'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
            ],
            sign1: '',
            sign2: '',
            result: null
        };
    },
    methods: {
        calculateCompatibility() {
        this.result = this.getCompatibility(this.sign1, this.sign2);
        },
        getCompatibility(sign1, sign2) {
        const compatibility = {
            'Aries': { 'Aries': 50, 'Taurus': 60, 'Gemini': 70, 'Cancer': 40, 'Leo': 80, 'Virgo': 50, 'Libra': 70, 'Scorpio': 60, 'Sagittarius': 90, 'Capricorn': 60, 'Aquarius': 80, 'Pisces': 50 },
            'Taurus': { 'Aries': 60, 'Taurus': 50, 'Gemini': 40, 'Cancer': 80, 'Leo': 60, 'Virgo': 90, 'Libra': 50, 'Scorpio': 70, 'Sagittarius': 60, 'Capricorn': 80, 'Aquarius': 50, 'Pisces': 90 },
            'Gemini': { 'Aries': 70, 'Taurus': 40, 'Gemini': 50, 'Cancer': 60, 'Leo': 70, 'Virgo': 60, 'Libra': 80, 'Scorpio': 50, 'Sagittarius': 80, 'Capricorn': 50, 'Aquarius': 90, 'Pisces': 60 },
            'Cancer': { 'Aries': 40, 'Taurus': 80, 'Gemini': 60, 'Cancer': 50, 'Leo': 70, 'Virgo': 80, 'Libra': 60, 'Scorpio': 90, 'Sagittarius': 50, 'Capricorn': 70, 'Aquarius': 50, 'Pisces': 80 },
            'Leo': { 'Aries': 80, 'Taurus': 60, 'Gemini': 70, 'Cancer': 70, 'Leo': 50, 'Virgo': 60, 'Libra': 80, 'Scorpio': 60, 'Sagittarius': 90, 'Capricorn': 60, 'Aquarius': 70, 'Pisces': 50 },
            'Virgo': { 'Aries': 50, 'Taurus': 90, 'Gemini': 60, 'Cancer': 80, 'Leo': 60, 'Virgo': 50, 'Libra': 70, 'Scorpio': 80, 'Sagittarius': 60, 'Capricorn': 90, 'Aquarius': 50, 'Pisces': 70 },
            'Libra': { 'Aries': 70, 'Taurus': 50, 'Gemini': 80, 'Cancer': 60, 'Leo': 80, 'Virgo': 70, 'Libra': 50, 'Scorpio': 60, 'Sagittarius': 90, 'Capricorn': 70, 'Aquarius': 80, 'Pisces': 60 },
            'Scorpio': { 'Aries': 60, 'Taurus': 70, 'Gemini': 50, 'Cancer': 90, 'Leo': 60, 'Virgo': 80, 'Libra': 60, 'Scorpio': 50, 'Sagittarius': 70, 'Capricorn': 80, 'Aquarius': 50, 'Pisces': 90 },
            'Sagittarius': { 'Aries': 90, 'Taurus': 60, 'Gemini': 80, 'Cancer': 50, 'Leo': 90, 'Virgo': 60, 'Libra': 90, 'Scorpio': 70, 'Sagittarius': 50, 'Capricorn': 70, 'Aquarius': 90, 'Pisces': 60 },
            'Capricorn': { 'Aries': 60, 'Taurus': 80, 'Gemini': 50, 'Cancer': 70, 'Leo': 60, 'Virgo': 90, 'Libra': 70, 'Scorpio': 80, 'Sagittarius': 70, 'Capricorn': 50, 'Aquarius': 60, 'Pisces': 80 },
            'Aquarius': { 'Aries': 80, 'Taurus': 50, 'Gemini': 90, 'Cancer': 50, 'Leo': 70, 'Virgo': 50, 'Libra': 80, 'Scorpio': 50, 'Sagittarius': 90, 'Capricorn': 60, 'Aquarius': 50, 'Pisces': 70 },
            'Pisces': { 'Aries': 50, 'Taurus': 90, 'Gemini': 60, 'Cancer': 80, 'Leo': 50, 'Virgo': 70, 'Libra': 60, 'Scorpio': 90, 'Sagittarius': 60, 'Capricorn': 80, 'Aquarius': 70, 'Pisces': 50 },
        };

        if (compatibility[sign1] && compatibility[sign1][sign2] !== undefined) {
            return compatibility[sign1][sign2];
        } else {
            return "Compatibility unknown.";
        }
        }
    }
    };
    </script>

<style src="./assets/css/compatibility.css"></style>