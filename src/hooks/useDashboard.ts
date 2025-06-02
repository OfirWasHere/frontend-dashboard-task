import { useState, useEffect } from "react";
import { fetchAllVisits, deleteVisits, editVisits, addVisits } from "../services/DataService";
import { VisitDataModal } from "../utils/types";

export default function useDashboard() {
    const [visits, setVisits] = useState<VisitDataModal[] | null>(null);
    const [filteredData, setFilteredData] = useState<VisitDataModal[]>(visits);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAllVisits();
            if (data) {
                setVisits(data);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (visits) {
            setFilteredData(visits);
        }
    }, [visits]);

    const handleDeleteClick = (id: string) => {
        deleteVisits(id);
        const updatedVisitsArr = visits.filter((item) => {
            return item.id !== id;
        });
        setVisits(updatedVisitsArr);
    };

    const handleSave = (
        updatedVisitsList: number,
        updatedDate: string,
        id: string
    ) => {
        editVisits({ id: id, visits: updatedVisitsList, date: updatedDate });
        const index = visits.findIndex((item) => item.id === id);
        const updatedVisitsArr = [...visits];
        updatedVisitsArr[index] = { visits: updatedVisitsList, date: updatedDate };
        setVisits(updatedVisitsArr);
    };

    const handleAddVisits = async (data: VisitDataModal) => {
        if (data) {
            addVisits(data);
            const result = await fetchAllVisits();
            if (result) {
                setVisits(result);
            }
        }
    };

    const handleFilters = (
        maxAmount: number,
        minAmount: number,
        mimDate: string,
        maxDate: string
    ) => {
        if (
            maxAmount === 0 &&
            minAmount === 0 &&
            mimDate === "" &&
            maxDate === ""
        ) {
            setFilteredData(visits);
            return;
        }

        const result = visits.filter(
            (item) =>
                (minAmount === 0 || item.visits > minAmount) &&
                (maxAmount === 0 || item.visits < maxAmount) &&
                (mimDate === "" || item.date >= mimDate) &&
                (maxDate === "" || item.date <= maxDate)
        );

        setFilteredData(result);
    };

    const TableHeadClickedSort = (sortType: string) => {
        let result;

        if (sortType === "VisitsUp") {
            result = [...filteredData].sort((a, b) => a.visits - b.visits);
        } else if (sortType === "VisitsDown") {
            result = [...filteredData].sort((a, b) => b.visits - a.visits);
        }
        if (sortType === "DateUp") {
            result = [...filteredData].sort(
                (a: any, b: any) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
            );
        } else if (sortType === "DateDown") {
            result = [...filteredData].sort(
                (a: any, b: any) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
            );
        }
        setFilteredData(result);
    };
    
    return { filteredData, visits, TableHeadClickedSort, handleFilters, handleAddVisits, handleSave, handleDeleteClick }
} 