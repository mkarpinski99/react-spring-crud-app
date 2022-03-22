package com.tjee.projekt2.utils;


import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CustomCSVReader {

    public static List<String[]> readFromCsv(File file) throws IOException, CsvValidationException {
        List<String[]> list = new ArrayList<>();

        CSVReader csvReader = new CSVReader(new FileReader(file));
        String[] line;
        while ((line = csvReader.readNext()) != null) {
            list.add(line);
        }
        csvReader.close();
        return list;
    }

}