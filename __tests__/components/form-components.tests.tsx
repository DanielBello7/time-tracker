/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import FormSelect from '@/components/form/form-select';

describe.skip("Testing Components", function () {

    it("should correctly set default option", function () {
        render(<FormSelect />);
        expect(screen.getByRole("option", { name: "Select an option" })).toBe(true);
    });
});


