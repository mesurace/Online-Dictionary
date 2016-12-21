package com.onlinedictionary.controller;

import com.onlinedictionary.service.SearchService;
import com.onlinedictionary.service.SearchServiceImp;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author sureshadhikari
 */
public class DictServlet extends HttpServlet {

    SearchService searchService = new SearchServiceImp();
    
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {

        String result = searchService.search(request.getParameter("searchkey"));
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(result);

    }
}
