"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import * as React from "react"
import { Calendar } from "@/components/ui/calendar";
import { FaCalendar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type DatePickerProps = {
	date: Date | undefined
	setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
	isLoading?: boolean
	required?: boolean
	fromDate?: Date
}

export default function DatePicker(props: DatePickerProps) {
	const {
		date,
		setDate,
		isLoading = false,
		required = false,
		fromDate
	} = props
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-full justify-start text-left font-normal",
						!date && "text-muted-foreground"
					)}
				>
					<FaCalendar className="mr-2 h-3 w-3" />
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					disabled={isLoading && true}
					selected={date}
					onSelect={setDate}
					toDate={new Date()}
					fromDate={fromDate}
					required={required && true}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}

