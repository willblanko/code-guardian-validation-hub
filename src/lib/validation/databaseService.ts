
import { TestResult } from "@/components/ValidationProgress";
import { TestConfig } from "@/components/TestConfigForm";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

// Save test results to database
export const saveTestResults = async (
  fileName: string,
  fileSize: number,
  config: TestConfig,
  results: TestResult[]
): Promise<string | null> => {
  try {
    // Fix: Using the proper format for Supabase insert - passing an array with a single object
    // and correctly casting complex objects to Json type
    const { data, error } = await supabase
      .from('validation_tests')
      .insert([{
        file_name: fileName,
        file_size: fileSize,
        test_config: config as unknown as Json,
        results: results as unknown as Json
      }])
      .select('id')
      .single();
    
    if (error) {
      console.error("Error saving test results:", error);
      return null;
    }
    
    // Fix: Handle potential null data with nullish coalescing operator
    return data?.id || null;
  } catch (error) {
    console.error("Error saving test results:", error);
    return null;
  }
};
