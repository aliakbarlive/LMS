import React from 'react';
import { Button } from '@/components/ui';
import { generate } from 'generate-password-ts';

interface PasswordOptions {
    length: number;
    numbers?: boolean;
    symbols?: boolean;
}

interface GeneratePasswordProps {
    sendData: (data: string) => void;
    passwordConfig: PasswordOptions;
}

const GeneratePassword: React.FC<GeneratePasswordProps> = ({ sendData, passwordConfig }) => {
    const handleClick = () => {
        const generatedPass = generate(passwordConfig);
        sendData(generatedPass);
    };

    return (
        <Button type='button' onClick={handleClick}>Generate Password</Button>
    );
};

export default GeneratePassword;
