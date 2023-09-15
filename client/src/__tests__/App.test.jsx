import Events from '../components/events.jsx';
import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe("Testing the events", () => {
    test("The events render", () => {
        const {getByTestId} = render(<Events />);
        expect(getByTestId("events")).toBeDefined();
    })
})