import { render, screen } from '@testing-library/react';
import FormSelect from '@/components/form/form-select';

describe.only("Testing Components", function () {

    it("should correctly set default option", function () {
        render(<FormSelect />);
        // expect(screen.getByRole("option", { name: "Select an option" })).toBe(true);
    });
});


