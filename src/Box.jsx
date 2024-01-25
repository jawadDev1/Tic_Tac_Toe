import { View, Text } from 'react-native'
import React from 'react'

export default function Box({ icon }) {
    switch (icon) {
        case 'X':
            return 'X';
            break;
    
        case 'O':
            return 'O';
            break;
    
        default:
            return '';
            break;
    }
}