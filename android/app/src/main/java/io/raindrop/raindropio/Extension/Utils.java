package io.raindrop.raindropio.Extension;

import android.util.Patterns;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public class Utils {
    /**
     * Extract urls from string.
     * @param input
     * @return
     */
    public static String extractUrl(String input)
    {
        List<String> result = new ArrayList<String>();

        String[] words = input.split("\\s+");


        Pattern pattern = Patterns.WEB_URL;
        for(String word : words)
        {
            if(pattern.matcher(word).find())
            {
                if(!word.toLowerCase().contains("http://") && !word.toLowerCase().contains("https://"))
                {
                    word = "http://" + word;
                }
                result.add(word);
            }
        }

        if (result.isEmpty())
            return "";

        return result.get(0);
    }
}
