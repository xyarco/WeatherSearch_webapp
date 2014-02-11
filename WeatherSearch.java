import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern; 

import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.Namespace;
import org.jdom.input.SAXBuilder;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.xml.sax.InputSource;

/**
 * Servlet implementation class WeatherSearch
 */
//@WebServlet("/WeatherSearch")
public class WeatherSearch extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public WeatherSearch() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/plain");

		String strPhpUrl = new String("http://default-environment-nvuizqzmds.elasticbeanstalk.com/?");
		String paraType = new String(request.getParameter("type"));
		
		if (paraType.equals("zipcode")) {
			String paraNoCity = new String(request.getParameter("no_city"));
			String paraUnit = new String(request.getParameter("unit"));
			strPhpUrl = new String(strPhpUrl + "type=zipcode" + "&no_city=" + paraNoCity + "&unit=" + paraUnit);
		} else {
			String paraNameCity = new String(request.getParameter("name_city"));
			String paraState = new String(request.getParameter("state"));
			String paraUnit = new String(request.getParameter("unit"));
			strPhpUrl = new String(strPhpUrl + "type=name" + "&name_city=" + paraNameCity + "&state=" + paraState + "&unit=" + paraUnit);
		}
		
		URL urlPhp = new URL(strPhpUrl);
		
		URLConnection urlConnection = urlPhp.openConnection();
		BufferedReader phpIn = new BufferedReader(
				new InputStreamReader(
						urlConnection.getInputStream()));
		
		String urlLine = null;
		StringBuffer builderXmlUrl = new StringBuffer();
		while ((urlLine = phpIn.readLine()) != null) {
			builderXmlUrl.append(urlLine);
		}
		phpIn.close();
		
		String strXmlUrl = builderXmlUrl.toString();
		strXmlUrl = strXmlUrl.trim();
		if (strXmlUrl.equals("") || strXmlUrl == null) {
			response.getWriter().write("");
			return ;
		} 

		URL urlXml = new URL(strXmlUrl);
		
		BufferedReader xmlIn = new BufferedReader(
				new InputStreamReader(urlXml.openStream()));
		
		String xmlLine = null;		
		StringBuffer builderXml = new StringBuffer();
		
		while ((xmlLine = xmlIn.readLine()) != null) {
			//System.out.println(xmlLine);
			builderXml.append(xmlLine);
		}
		xmlIn.close();
		
		String strXml = builderXml.toString();
		if (strXml.equals("") || strXml == null) {
			response.getWriter().write("");
			return ;
		} 
		
		SAXBuilder saxBuilder = new SAXBuilder();
		
		Document document = new Document();
		try {
			document = saxBuilder.build(new InputSource(new ByteArrayInputStream(strXml.getBytes("utf-8"))));
		} catch (JDOMException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Element rootNode = document.getRootElement();
		
		Namespace yweather = Namespace.getNamespace("http://xml.weather.yahoo.com/ns/rss/1.0");
		
		JSONObject rootObject = new JSONObject();
		
		Element conditionNode = rootNode.getChild("channel").getChild("item").getChild("condition", yweather);
		JSONObject conditionObject = new JSONObject();
		
		JSONArray forecasts = new JSONArray();
		
		List listForecasts = rootNode.getChild("channel").getChild("item").getChildren("forecast", yweather);
		
		for (int i = 0; i < listForecasts.size(); ++i) {
			Element node = (Element) listForecasts.get(i);
			JSONObject temp = new JSONObject();
			temp.put("text", node.getAttributeValue("text"));
			temp.put("high", node.getAttributeValue("high"));
			temp.put("day", node.getAttributeValue("day"));
			temp.put("low", node.getAttributeValue("low"));
			
			forecasts.add(temp);
		}
		String strRegex = "\\(?\\b(http://|www[.])[-A-Za-z0-9+&/%?=~_()|!:,.;]*[-A-Za-z0-9+&/%=~_()|]";
		Pattern pattern = Pattern.compile(strRegex);
		Matcher matcher = pattern.matcher(rootNode.getChild("channel").getChild("item").getChildText("description"));
		String strImgUrl = new String("");
		if (matcher.find()) {
			strImgUrl = matcher.group();
			if (strImgUrl.startsWith("(") && strImgUrl.endsWith(")")) {
				strImgUrl = strImgUrl.substring(1, strImgUrl.length() - 1);
			}
		}

		JSONObject weatherObject = new JSONObject();
		weatherObject.put("forecast", forecasts);
		
		conditionObject.put("text", conditionNode.getAttributeValue("text"));
		conditionObject.put("temp", conditionNode.getAttributeValue("temp"));
		
		weatherObject.put("condition", conditionObject);
		
		Element locationNode = rootNode.getChild("channel").getChild("location", yweather);
		JSONObject locationObject = new JSONObject();
		
		locationObject.put("region", locationNode.getAttributeValue("region"));
		locationObject.put("country", locationNode.getAttributeValue("country"));
		locationObject.put("city", locationNode.getAttributeValue("city"));
		
		weatherObject.put("location", locationObject);

		weatherObject.put("link", rootNode.getChild("channel").getChildText("link"));
		
		weatherObject.put("img", strImgUrl);
		
		weatherObject.put("feed", strXmlUrl);
		
		String strUnit = new String("" + Character.toUpperCase(strXmlUrl.charAt(strXmlUrl.length() - 1)));
		
		JSONObject tempObject = new JSONObject();
		tempObject.put("temperature", strUnit);
		
		weatherObject.put("units", tempObject);
		
		rootObject.put("weather", weatherObject);
		response.getWriter().write(rootObject.toJSONString());

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
