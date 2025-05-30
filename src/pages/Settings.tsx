import React from 'react';

export const Settings: React.FC = () => {
  return (
    <div className='p-6'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>Settings</h1>
        <p className='text-gray-600'>
          Manage your application settings and preferences
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold mb-4'>General Settings</h3>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-2'>
                Hospital Name
              </label>
              <input
                type='text'
                defaultValue='General Hospital'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-2'>
                Time Zone
              </label>
              <select className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <option value='EST'>Eastern Standard Time (EST)</option>
                <option value='CST'>Central Standard Time (CST)</option>
                <option value='MST'>Mountain Standard Time (MST)</option>
                <option value='PST'>Pacific Standard Time (PST)</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium mb-2'>
                Default Shift Duration
              </label>
              <select className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <option value='8'>8 hours</option>
                <option value='10'>10 hours</option>
                <option value='12'>12 hours</option>
              </select>
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold mb-4'>Notification Settings</h3>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium'>Email Notifications</p>
                <p className='text-sm text-gray-600'>
                  Receive email alerts for schedule changes
                </p>
              </div>
              <input
                type='checkbox'
                defaultChecked
                className='h-4 w-4 text-blue-600'
              />
            </div>
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium'>SMS Notifications</p>
                <p className='text-sm text-gray-600'>
                  Receive text messages for urgent updates
                </p>
              </div>
              <input type='checkbox' className='h-4 w-4 text-blue-600' />
            </div>
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium'>Shift Reminders</p>
                <p className='text-sm text-gray-600'>
                  Get reminders before shifts start
                </p>
              </div>
              <input
                type='checkbox'
                defaultChecked
                className='h-4 w-4 text-blue-600'
              />
            </div>
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium'>Overtime Alerts</p>
                <p className='text-sm text-gray-600'>
                  Alert when staff approach overtime limits
                </p>
              </div>
              <input
                type='checkbox'
                defaultChecked
                className='h-4 w-4 text-blue-600'
              />
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold mb-4'>Security Settings</h3>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-2'>
                Current Password
              </label>
              <input
                type='password'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-2'>
                New Password
              </label>
              <input
                type='password'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-2'>
                Confirm New Password
              </label>
              <input
                type='password'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <button className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700'>
              Update Password
            </button>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold mb-4'>Department Management</h3>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <span>Emergency Department</span>
              <button className='text-blue-600 hover:text-blue-800 text-sm'>
                Edit
              </button>
            </div>
            <div className='flex justify-between items-center'>
              <span>Surgery Department</span>
              <button className='text-blue-600 hover:text-blue-800 text-sm'>
                Edit
              </button>
            </div>
            <div className='flex justify-between items-center'>
              <span>ICU Department</span>
              <button className='text-blue-600 hover:text-blue-800 text-sm'>
                Edit
              </button>
            </div>
            <div className='flex justify-between items-center'>
              <span>Cardiology Department</span>
              <button className='text-blue-600 hover:text-blue-800 text-sm'>
                Edit
              </button>
            </div>
            <div className='flex justify-between items-center'>
              <span>Pediatrics Department</span>
              <button className='text-blue-600 hover:text-blue-800 text-sm'>
                Edit
              </button>
            </div>
            <button className='w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200'>
              Add New Department
            </button>
          </div>
        </div>
      </div>

      <div className='mt-6 bg-white p-6 rounded-lg border shadow-sm'>
        <h3 className='text-lg font-semibold mb-4'>Data Management</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <button className='bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700'>
            Export Data
          </button>
          <button className='bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200'>
            Import Data
          </button>
          <button className='bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700'>
            Clear All Data
          </button>
        </div>
      </div>

      <div className='mt-6 flex justify-end'>
        <button className='bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700'>
          Save All Settings
        </button>
      </div>
    </div>
  );
};
