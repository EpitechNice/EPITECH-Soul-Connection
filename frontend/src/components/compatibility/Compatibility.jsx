import React, { useState } from 'react';
import SideMenu from "../layout/SideMenu";

const Compatibility = () => {
    const signs = [
        'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
        'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];

    const [sign1, setSign1] = useState('');
    const [sign2, setSign2] = useState('');
    const [result, setResult] = useState(null);

    const calculateCompatibility = () => {
        if (sign1 && sign2) {
            setResult(getCompatibility(sign1, sign2));
        } else {
            setResult(null);
        }
    };

    const getCompatibility = (sign1, sign2) => {
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
            const baseCompatibility = compatibility[sign1][sign2];
            const variation = Math.floor(Math.random() * 11) - 5;
            const result = Math.max(0, Math.min(100, baseCompatibility + variation));
            return result;
        } else {
            return "Compatibility unknown.";
        }
    };

    return (
        <div className="compatibility pages">
            <div className="col-12 col-lg-3">
                <SideMenu />
            </div>
            <h1>Astrological Sign Compatibility</h1>
            <div className="separator"></div>
            <div>
                <label htmlFor="sign1">Your Sign:</label>
                <select value={sign1} onChange={(e) => setSign1(e.target.value)} id="sign1">
                    <option value="">Select your sign</option>
                    {signs.map(sign => (
                        <option key={sign} value={sign}>{sign}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="sign2">Partner's Sign:</label>
                <select value={sign2} onChange={(e) => setSign2(e.target.value)} id="sign2">
                    <option value="">Select partner's sign</option>
                    {signs.map(sign => (
                        <option key={sign} value={sign}>{sign}</option>
                    ))}
                </select>
            </div>
            <div>
                <button 
                    className="button_comp" 
                    onClick={calculateCompatibility} 
                    disabled={!sign1 || !sign2}
                >
                    Calculate Compatibility
                </button>
            </div>
            {result !== null && (
                <div>
                    <h2>Result: {result}%</h2>
                </div>
            )}
        </div>
    );
};

export default Compatibility;
