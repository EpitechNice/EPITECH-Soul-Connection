import React from 'react';
import SideMenu from "../layout/SideMenu";

import { useGetEmployeesQuery } from "../../redux/api/employeeApi";


const Employees = () => {
    const { data, isLoading } = useGetEmployeesQuery();

    return (
        <div>
            <div className="col-12 col-lg-3">
                <SideMenu />
            </div>
            <p className="text-center mt-1">
                Coaches
            </p>

{/* TODO: exemple de comment j'ai implémenté des produits dans un ancien projet
Faire la même avec les employés */}
            {/* <section id="products" className="mt-5">
            <div className="row">
                {data?.products?.map((product) => (
                  <ProductItem product={product} columnSize={columnSize} />
                ))}
            </div>
          </section> */}
        </div>
    );
};

export default Employees;