import React, { useState } from "react";
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Statistics } from "./Statistics/Statistics";
import { Section } from "./Section/Section";
import { Notification } from "./Notification/Notification"; 
    
export const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleLeaveFeedback = (option) => {
        switch(option) {
            case 'good':
                setGood(prevGood => prevGood + 1);
                break;
            case 'neutral':
                setNeutral(prevNeutral => prevNeutral + 1);
                break;
            case 'bad':
                setBad(prevBad => prevBad + 1);
                break;
            default:
                break;
        }
    };

    const countTotalFeedback = () => {
        return good + neutral + bad;
    };

    const countPositiveFeedbackPercentage = () => {
        const total = countTotalFeedback();

        if (total === 0) {
            return 0;
        }

        const percentage = (good / total) * 100;
        const roundedPercentage = percentage.toFixed(2);

        return roundedPercentage;
    };

    const total = countTotalFeedback();
    const positivePercentage = countPositiveFeedbackPercentage();
    const options = ['good', 'neutral', 'bad'];

    return (
        <div>
            <Section title="Please leave feedback">
                <FeedbackOptions options={options} onLeaveFeedback={handleLeaveFeedback} />
            </Section>

            {total > 0 ? (
                <Section title="Statistics">
                    <Statistics good={good} neutral={neutral} bad={bad} total={total} positivePercentage={positivePercentage} />
                </Section>
            ) : (
                <Notification message="There is no feedback" />
            )}
        </div>
    );
}