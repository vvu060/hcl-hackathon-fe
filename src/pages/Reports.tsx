import React from 'react';

export const Reports: React.FC = () => {
  return (
    <div className='p-6'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>Reports</h1>
        <p className='text-gray-600'>
          View and generate staff and scheduling reports
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold mb-4'>Staff Performance</h3>
          <div className='space-y-3'>
            <div className='flex justify-between'>
              <span>Average Hours/Week</span>
              <span className='font-medium'>42.5</span>
            </div>
            <div className='flex justify-between'>
              <span>Overtime Hours</span>
              <span className='font-medium'>8.2</span>
            </div>
            <div className='flex justify-between'>
              <span>Attendance Rate</span>
              <span className='font-medium text-green-600'>96.8%</span>
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold mb-4'>Schedule Efficiency</h3>
          <div className='space-y-3'>
            <div className='flex justify-between'>
              <span>Coverage Rate</span>
              <span className='font-medium text-green-600'>98.5%</span>
            </div>
            <div className='flex justify-between'>
              <span>Shift Changes</span>
              <span className='font-medium'>12</span>
            </div>
            <div className='flex justify-between'>
              <span>Open Shifts</span>
              <span className='font-medium text-red-600'>3</span>
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold mb-4'>Department Stats</h3>
          <div className='space-y-3'>
            <div className='flex justify-between'>
              <span>Emergency</span>
              <span className='font-medium'>24/7</span>
            </div>
            <div className='flex justify-between'>
              <span>Surgery</span>
              <span className='font-medium'>16 hrs</span>
            </div>
            <div className='flex justify-between'>
              <span>ICU</span>
              <span className='font-medium'>24/7</span>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold mb-4'>Generate Reports</h3>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-2'>
                Report Type
              </label>
              <select className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <option value=''>Select report type</option>
                <option value='staff-hours'>Staff Hours Report</option>
                <option value='attendance'>Attendance Report</option>
                <option value='overtime'>Overtime Report</option>
                <option value='schedule-coverage'>Schedule Coverage</option>
                <option value='department-summary'>Department Summary</option>
              </select>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium mb-2'>
                  Start Date
                </label>
                <input
                  type='date'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-2'>
                  End Date
                </label>
                <input
                  type='date'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </div>
            <button className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700'>
              Generate Report
            </button>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold mb-4'>Recent Reports</h3>
          <div className='space-y-3'>
            <div className='flex justify-between items-center p-3 bg-gray-50 rounded'>
              <div>
                <p className='font-medium'>Monthly Staff Hours</p>
                <p className='text-sm text-gray-600'>
                  Generated on Dec 1, 2024
                </p>
              </div>
              <button className='text-blue-600 hover:text-blue-800 text-sm'>
                Download
              </button>
            </div>
            <div className='flex justify-between items-center p-3 bg-gray-50 rounded'>
              <div>
                <p className='font-medium'>Attendance Summary</p>
                <p className='text-sm text-gray-600'>
                  Generated on Nov 28, 2024
                </p>
              </div>
              <button className='text-blue-600 hover:text-blue-800 text-sm'>
                Download
              </button>
            </div>
            <div className='flex justify-between items-center p-3 bg-gray-50 rounded'>
              <div>
                <p className='font-medium'>Overtime Report</p>
                <p className='text-sm text-gray-600'>
                  Generated on Nov 25, 2024
                </p>
              </div>
              <button className='text-blue-600 hover:text-blue-800 text-sm'>
                Download
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8 bg-white p-6 rounded-lg border shadow-sm'>
        <h3 className='text-lg font-semibold mb-4'>Weekly Schedule Overview</h3>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b'>
                <th className='px-4 py-2 text-left'>Department</th>
                <th className='px-4 py-2 text-left'>Monday</th>
                <th className='px-4 py-2 text-left'>Tuesday</th>
                <th className='px-4 py-2 text-left'>Wednesday</th>
                <th className='px-4 py-2 text-left'>Thursday</th>
                <th className='px-4 py-2 text-left'>Friday</th>
                <th className='px-4 py-2 text-left'>Weekend</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b'>
                <td className='px-4 py-2 font-medium'>Emergency</td>
                <td className='px-4 py-2'>8 staff</td>
                <td className='px-4 py-2'>8 staff</td>
                <td className='px-4 py-2'>8 staff</td>
                <td className='px-4 py-2'>8 staff</td>
                <td className='px-4 py-2'>8 staff</td>
                <td className='px-4 py-2'>6 staff</td>
              </tr>
              <tr className='border-b'>
                <td className='px-4 py-2 font-medium'>Surgery</td>
                <td className='px-4 py-2'>6 staff</td>
                <td className='px-4 py-2'>6 staff</td>
                <td className='px-4 py-2'>5 staff</td>
                <td className='px-4 py-2'>6 staff</td>
                <td className='px-4 py-2'>4 staff</td>
                <td className='px-4 py-2'>2 staff</td>
              </tr>
              <tr className='border-b'>
                <td className='px-4 py-2 font-medium'>ICU</td>
                <td className='px-4 py-2'>5 staff</td>
                <td className='px-4 py-2'>5 staff</td>
                <td className='px-4 py-2'>5 staff</td>
                <td className='px-4 py-2'>5 staff</td>
                <td className='px-4 py-2'>5 staff</td>
                <td className='px-4 py-2'>4 staff</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
