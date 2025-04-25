import React from 'react';
import { Link } from 'react-router-dom';

const DocumentTable = ({ language, documents }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-slate-300 shadow-lg">
        <tbody>
          {documents.map((category, index) => (
            <React.Fragment key={index}>
              {/* Category Row */}
              <tr className="bg-blue-200 text-center font-bold">
                <td colSpan={3} className="p-3 text-lg">
                  {category.category}
                </td>
              </tr>

              {category.items.map((item, idx, arr) => (
                <React.Fragment key={idx}>
                  {/* Subcategory Row - Ensure vertical separation */}
                  {item.subcategory && (
                    <tr className="bg-gray-300 text-center font-semibold">
                      <td
                        className="border-gray-400 w-1/4 border-r pt-3 align-top"
                        rowSpan={
                          arr.filter((i) => i.subcategory === item.subcategory)
                            .length
                        }
                      >
                        {item.subcategory}
                      </td>
                      <td className="p-3"></td>
                      <td className="w-1/4 border-l p-3 text-center"></td>
                    </tr>
                  )}

                  {/* Document Row - No border below last item of subcategory */}
                  {item.description && (
                    <tr
                      className={`hover:bg-slate-100 ${
                        idx === arr.length - 1 ? '' : 'border-b'
                      }`}
                    >
                      <td className="p-3"></td>
                      <td className="border-gray-400 w-1/4 border-l p-3 text-center align-top">
                        {item.description[language]}
                      </td>
                      {/* <td>
                        {item.description?.en || 'No description available'}
                      </td> */}

                      <td className="border-gray-400 w-1/4 border-l p-3 text-center">
                        <Link
                          to={item.link}
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          CLICK HERE
                        </Link>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;
