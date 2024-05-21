import { useEffect, useState } from "react";
import { Container, Text, VStack, Box, Heading, Link, Spinner } from "@chakra-ui/react";

const Index = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://hn.algolia.com/api/v1/search?query=react")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.hits);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" mb={6}>Hacker News Aggregator</Heading>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          articles.map((article) => (
            <Box key={article.objectID} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <Heading as="h3" size="md">
                <Link href={article.url} isExternal>
                  {article.title}
                </Link>
              </Heading>
              <Text mt={2}>{article.author}</Text>
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Index;