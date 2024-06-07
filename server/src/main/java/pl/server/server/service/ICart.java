package pl.server.server.service;

import pl.server.server.helpers.BookException;

import java.util.List;

public interface ICart {
    public void init(String userId) throws BookException;
    public void addBook(String title) throws BookException;
    public void removeBook(String title) throws BookException;
    public List<String> getContents();
    public void remove();
}
