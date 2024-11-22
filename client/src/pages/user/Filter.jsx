import { useGetAllCategoryQuery } from '@/api/categorySlice'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Select, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { SelectContent, SelectLabel } from '@radix-ui/react-select'
import React, { useState } from 'react'

const Filter = ({handleFilterChange}) => {

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortByPrice, setSortByPrice] = useState("");

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prevCategories)=>{
            const newCategories = prevCategories.includes(categoryId) ? prevCategories.filter((id)=>id !== categoryId):[...prevCategories,categoryId];
            handleFilterChange(newCategories)
            return newCategories
        })
    }

    


    const selectByPriceHandler = (selectedValue) => {
        setSortByPrice(selectedValue);
        handleFilterChange(selectedCategories, selectedValue);
    }

    const { data } = useGetAllCategoryQuery()


    console.log(data)
    return (
        <div className="w-full md:w-[20%]">
                <h1 className="font-semibold text-lg md:text-xl">Filter Options</h1>
            <div className="flex items-center justify-between">
                <Select className="relative" onValueChange={selectByPriceHandler}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className='h-full bg-background w-[180px]'>
                        <SelectGroup>
                            <SelectLabel>Sort by price</SelectLabel>
                           
                                <SelectItem value="low">Low to High</SelectItem>
                                <SelectItem value="high">High to Low</SelectItem>
                          
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Separator className="my-4" />
            <div>
                <h1 className="font-semibold mb-2">CATEGORY</h1>
                {data?.map((category) => (
                    <div className="flex items-center space-x-2 my-2">
                        <Checkbox
                            id={category._id}
                            onCheckedChange={() => handleCategoryChange(category._id)}
                        />
                        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {category.name}
                        </Label>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Filter