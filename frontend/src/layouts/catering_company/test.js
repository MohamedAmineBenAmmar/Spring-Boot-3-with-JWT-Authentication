import React from 'react'
import AddCateringCompanyForm from './catering_form'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'

const TestComponent = () => {
    return (
              <DashboardLayout>
        <DashboardNavbar />
        <AddCateringCompanyForm/>
        </DashboardLayout>
        
    )
}

export default TestComponent