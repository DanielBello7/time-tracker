import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import Authentication from "@/pages/index";
import Dashboard from '@/pages/dashboard';

jest.mock('next/router', () => require('next-router-mock'));

describe('core components rendered', () => {
    it('should render the login authentication page', () => {
        render(<Authentication />);
        const header = screen.getByRole('heading');
        expect(header).toHaveTextContent('login');
    });
});