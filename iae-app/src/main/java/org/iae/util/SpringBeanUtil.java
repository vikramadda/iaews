package org.iae.util;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class SpringBeanUtil implements ApplicationContextAware 
{
	private static ApplicationContext context = null;

	@Override
	public void setApplicationContext(ApplicationContext _context) throws BeansException 
	{
		context = _context;
	}
	
	public static <Bean> Bean getBean(String name, Class<Bean> beanClass)
	{
        return context.getBean( name, beanClass );
	}

    @SuppressWarnings("unchecked")
	public static <Bean> Bean getBean(String name, Object[] constructorArgs, Class<Bean> beanClass)
    {
        return (Bean) context.getBean( name, constructorArgs );
    }

	public static <Bean> Bean getBean(Class<Bean> beanClass)
	{
		return context.getBean(beanClass);
	}
}
