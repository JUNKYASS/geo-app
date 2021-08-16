/**
 * Тестовый компонент для ознакомления с такой технологией как STORYBOOK
 */
import React from 'react';
import cn from 'classnames';

type TestSbProps = { 
  name?: string; 
  className?: string; 
  initialValue?: any; 
  placeholder?: string 
};

const TestSb: React.FC<TestSbProps> = ({ name, className, initialValue, placeholder, ...props }) => {
  const classnames = cn(
    'input-common', 
    {
      className: className
    }
  );

  return (
    <input
      name={name ? name : 'inpt-cmn'}
      className={classnames}
      value={initialValue}
      placeholder={placeholder ? placeholder : 'Напиши здесь что-нибудь...'}
      {...props}
    />
  );
};

export {
  TestSb
};